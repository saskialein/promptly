import { Schema, model, models } from 'mongoose'

const ApiKeySchema = new Schema({
  provider: { type: String, required: true },
  apiKey: { type: String, required: true },
  iv: { type: String, required: true },
})

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
  apiKeys: {
    type: [ApiKeySchema],
    default: [],
    required: false,
  },
})

//Look into the models.User, see if the model is there, and only if it is not there, create a new model
//this is because this route gets called every time and the connection is established every single time from scratch
const User = models.User || model('User', UserSchema)

export default User
