import mongoose from 'mongoose';
import tuitsSchema from "./tuit-schema.js";

const tuitsModel = mongoose.model('TuitModel', tuitsSchema);
export default tuitsModel;