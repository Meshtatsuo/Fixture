const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 1,
            maxlength: 250
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 500
        },
        price: {
            type: Number,
            required: true,
            min: 0.99
        },
        //additional code needed here for AWS
        thumbnailKey: {
            type: String
        },
        //additional code needed here for AWS
        fileKey: {
            type: String
        },
        //additional code needed here for AWS
        fileName: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //   get: timestamp => dateFormat(timestamp)
        }
    }
    // may be adding virtuals for additional fields
    // ,
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     },
    // prevents virtuals from creating duplicate of _id as `id`
    // id: false
    // }
);


const Product = model('Product', productSchema);

module.exports = Product;
