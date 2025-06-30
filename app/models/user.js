import mongoose from 'mongoose'
// const bcrypt = require('bcrypt');
// const uniqueString = require('unique-string')
// const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name : { type : String , required : true },
} , { timestamps : true , toJSON : { virtuals : true } });

// userSchema.plugin(mongoosePaginate);

// userSchema.methods.hashPassword = function(password) {
//     let salt = bcrypt.genSaltSync(15);
//     let hash = bcrypt.hashSync(password , salt);

//     return hash;
// }

// userSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password , this.password);
// }

// userSchema.methods.setRememberToken = function(res) {
//     const token = uniqueString();
//     res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * 90 , httpOnly : true , signed :true});
//     this.updateOne({ rememberToken : token } , err => {
//         if(err) console.log(err);
//     });
// }

export default mongoose.model('User', userSchema)