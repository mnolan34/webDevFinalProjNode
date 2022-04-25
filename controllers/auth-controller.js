import * as userDao from "../dao/users-dao.js";

/**
 * Sign up and initiate session if successful.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
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
 * Remove password from profile for security purpose.
 *
 * @param result
 * @returns {{firstName: *, lastName: *, emailOrNumber: *, dateJoined: ({default: () => number, type: Date | DateConstructor}|*), isCritic: ({type: Boolean | BooleanConstructor, required: boolean}|*), isAdmin: ({type: Boolean | BooleanConstructor, required: boolean}|*), username}}
 */
const parseProfileData = (result) => {
  return {
    firstName: result.firstName,
    lastName: result.lastName,
    username: result.username,
    emailOrNumber: result.emailOrNumber,
    isCritic: result.isCritic,
    isAdmin: result.isAdmin,
    dateJoined: result.dateJoined
  };
}

/**
 * Sign in and initiate session
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
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
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
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
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
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

export default (app) => {
  app.post('/api/signup', signUp);
  app.get('/api/profile', getCurrentUserProfile);
  app.post('/api/signin', signIn);
  app.post('/api/signout', signOut);
}
