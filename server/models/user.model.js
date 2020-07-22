import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    educator:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        trim:true,
        unique:"Email already exists",
        match:[/.+\@.+\..+/, 'Please fill a valid email address'],
        required:"Email is required"
    },
    hashed_password:{
        type:String,
        required:"Password is required"
    },
    salt:String,
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }
})

// use to create a virtual field on the document, is not 
// return when the document is queried
UserSchema.virtual('password').set(function(password){
// Unaware what is used for and also when it's called
    this._password = password;
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}).get(function() {
    return this._password
})

// Adds Validation to the hashed_password receives the field
// as first argument
UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password','Password must be at least 6 characters.')
    if(this.isNew && !this._password){
        this.invalidate('password','Password is required')
    }
    }
},null)

UserSchema.methods = {
    // used to ensure the password from the user and the 
    // saved password are the same
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    // encrypt password on creation or update
    encryptPassword : function(password) {
        if(!password) return ""
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password).digest('hex')
        }catch(e){
            return ''
        }
    },
    // Create a salt for the hash, this ensure no two hash 
    // for the same value are the same
    makeSalt:function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

export default mongoose.model("User",UserSchema)