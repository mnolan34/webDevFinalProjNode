/**
 * @file Controller RESTful Web service API for authentication resource
 */
import * as userDao from "../dao/users-dao.js";


/**
 * Creates authentication controller variable
 * @param {Express} app Express instance to declare the RESTful Web service API
 */
const authController = (app) => {
  app.post('/api/signup', signUp);
  app.get('/api/profile', getCurrentUserProfile);
  app.post('/api/signin', signIn);
  app.post('/api/signout', signOut);
}

/**
 * Sign up and initiate session if successful.
 * @param {Request} req Represents request from client, including the request body which
 * contains the profile of a new user who is trying to sign up.
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the user objects
 */
const signUp = async (req, res) => {
  const newProfile = req.body;

  if (req.session['profile']) res.sendStatus(403);
  else {
    try {
      // Check if username is taken.
      if (await userDao.findUserByUsername(newProfile.username))
        res.status(400).send("username is taken");

      // Check if email or number is taken.
      else if (await userDao.findUserByEmailOrNumber(newProfile.emailOrNumber))
        res.status(400).send("email or number is taken");

      // Otherwise, add sign up user
      else {
        const result = await userDao.createUser(newProfile);
        const parsedProfile = parseProfileData(result);
        req.session['profile'] = parsedProfile;
        res.json(parsedProfile);
      }
    } catch (error) {
      res.status(400).send("Please make sure to enter all required fields.")
    }
  }
}

/**
 * Parses the given profile. Note that the password from profile is removed for security purpose.
 * @param  {Object} profileData
 */
const parseProfileData = (result) => {
  const profileData = {
    firstName: result.firstName,
    lastName: result.lastName,
    username: result.username,
    emailOrNumber: result.emailOrNumber,
    isCritic: result.isCritic,
    isAdmin: result.isAdmin,
    dateJoined: result.dateJoined
  }
  return profileData;
}

/**
 * Sign in and initiate session if successful.
 * @param {Request} req Represents request from client, including the request body which
 * contains the profile credentials of a new user who is trying to sign in.
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the user objects
 */
const signIn = async (req, res) => {
  const credentials = req.body;
  try {
    const result = await userDao.verifyCredential(credentials.emailOrNumber, credentials.password)

    // null means login fail. return 401
    if (!result) {
      // Clear session
      req.session.destroy();
      res.sendStatus(401);
    } else {
      // Remove password from profile for security purpose.
      const profile = parseProfileData(result);

      // Store profile data in session
      req.session['profile'] = profile;

      // Return successful status with user profile data
      res.json(profile)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(503);
  }
}

/**
 * Sign out and clear session.
 * @param {Request} req Represents request from client, including the request session 
 * which contains the profile of a new user who is trying to sign out.
 * @param {Response} res Represents response to client, including status on whether 
 * logging out of the profile was successful or not
 */
const signOut = async (req, res) => {
  if (!req.session['profile']) {
    res.sendStatus(404);
  } else {
    req.session.destroy();
    res.sendStatus(200);
  }
}

/**
 * Get current user profile.
 * @param {Request} req Represents request from client, including the request session 
 * which contains the profile of the current logged in user.
 * @param {Response} res Represents response to client,  including the
 * body formatted as JSON arrays containing the current profile object.
 * The response may also be a status on whether retrieving the current profile 
 * was successful or not
 */
const getCurrentUserProfile = async (req, res) => {
  const profile = req.session['profile'];

  // null mean unauthenticated
  if (!profile) res.sendStatus(401);
  else {
    try {
      // Try to reload profile in case of any change.
      const reloadedProfile = await userDao.findUserByUsername(profile.username);
      if (reloadedProfile) {
        // non-null means authenticated
        req.session['profile'] = reloadedProfile;
        res.json(reloadedProfile);
      } else {
        // If null, the user is probably removed from the DB by admin.
        req.session.destroy();
        res.sendStatus(401);
      }
    } catch (error) {
      // Force unauthenticated user if fail to obtain user from DB
      req.session.destroy();
      res.sendStatus(500);
    }
  }
}

export default authController;