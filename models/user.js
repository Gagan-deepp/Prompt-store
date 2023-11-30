import { Schema , model , models} from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        unique: [true , "Email already exist"],
        required: [true , "Email required"]
    },
    name:{
        type: String,
        required: [true , "Name of user required"]
    },
    image:{
        type: String,
    },
})

//* The 'models' tag provided by Mongoose check If a model named 'users' already exist or not.
//* If exist it asign exist model to 'User' variable.
//* If not then model function will called and create a new model.

const User = models.User || model("User", userSchema)

export default User