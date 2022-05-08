const mongoose = require('mongoose');
const slugify = require('slugify');

const VideoSchema = new mongoose.Schema(
    {
        videoUrl: {
            type: String,
        }, 
        title: {
            type: String,
            required: [true, 'Video title is required']
        },       
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        versionKey: '_version',
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id
            }
        }
    }
)

module.exports = mongoose.model('Video', VideoSchema);