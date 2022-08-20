const { Schema, model, Types } = require('mongoose');

const moment = require('moment')

//reactionSchema first, so that thoughtSchema can use reactionSchema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('ddd, MMM Do YYYY, h:mm:ss a'),
        },
    },
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('ddd, MMM Do YYYY, h:mm:ss a'),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },

    {
    toJSON: {
      virtuals: true,
    },
    id: false,
    }

)

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })
  
const Thought = model('thought', thoughtSchema);

module.exports = Thought;