const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const productSchema = require('./Product');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        orders: [Order.schema],
        //check this
        product: [
            // I'm not sure if this wil return purchased items or just the items listed by the user
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ],
        //purchasedItems: [productSchema]

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

    // productSchema.virtual('numberSold').get(function() {
    //     return this.product.length;
    //   });

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;
