import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    email:{
        type:String,
        trim:true,
        unique:"Email already exists",
        match:[/.+\@.+\..+/, 'Please fill a valid email address'],
        required:"Email is required"
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    hashed_password:{
        type:String,
        required:"Password is required"
    },
    salt:String
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


UserSchema.methods = {
    // used to ensure the password from the user and the 
    // saved password are the same
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    // encrypt password on creation or update
    encryptPassword : function(password) {
        if(!this.password) return ""
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
        return Math.round((new Date.now().valueOf() * Math.random())) + ''
    }
}

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

export default mongoose.model("User",UserSchema)