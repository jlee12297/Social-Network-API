const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true, 
            validate: [validateEmail, "Please provide a valid email address"],
            match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
            ],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
    toJSON: {
      virtuals: true,
    },
    id: false,
    }
)

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  
const User = model('user', userSchema);

module.exports = User;