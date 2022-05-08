const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Post title is required'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Description is required for the post']
        },
        photo: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: [true, 'username is required']
        },
        likes: {
            type: Array,
            default: []
        },
        date: {
            type: Date,
            default: Date.now
        },
        share: {
            type: String,
        },

        status: {
            type: String,
            enum: ['approved', 'pending', 'published'],
            default: 'pending'
        },

        slug: String,

        viewsCount: {
            type: Number,
            default: 0,
        },
        comments: [
            
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            }
        ],
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],

        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: '_version',
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id;
            }
        }
    }
)
PostSchema.set('toJSON', { getters: true, virtuals: true });

PostSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true})
    next();
});
PostSchema.findByTitle = function(title){
    return this.findOne({title: title})
}
PostSchema.statics.findByCategory = function(categories){
    return this.findOne({categories: categories})
}

module.exports = mongoose.model('Post', PostSchema);