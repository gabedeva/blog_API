const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'category name is required'],
            unique: true
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            }
        ],
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

CategorySchema.set('toJSON', {getters: true, virtuals: true});

CategorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true})
    next();
});

CategorySchema.statics.findByName = function(name){
    return this.findOne({name: name});
}

module.exports = mongoose.model('Category', CategorySchema);