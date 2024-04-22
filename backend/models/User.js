const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({

    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
	role: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default:true },

});

// for user id generation
const customIdPrefix = "USR";
const length = 5;

// Pre-save hook to generate id
UserSchema.pre("validate", async function (next) {
    const MyModel = this.constructor;
    try {
        // Find the last document with a custom ID starting with the provided prefix
        const lastDoc = await MyModel.findOne({ userId: { $regex: new RegExp(`^${customIdPrefix}`) } })
            .sort({ userId: -1 })
            .exec();

        let newId = customIdPrefix;
        if (lastDoc) {
            const currentNumber = parseInt(lastDoc.userId.slice(customIdPrefix.length));
            newId += String(currentNumber + 1).padStart(length, "0");
        } else {
            newId += "00001";
        }
        this.userId = newId;
        console.log(newId);
        next();
    } catch (err) {
        console.error('Error generating user ID:', err);
        next(err);
    }
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel