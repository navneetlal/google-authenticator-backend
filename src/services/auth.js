const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ''
const CALLBACK_URL = process.env.CALLBACK_URL ?? 'http://www.example.com/auth/google/callback'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        console.log('AccessToken: ', accessToken)
        console.log('RefreshToken: ', refreshToken)
        console.log('Profile: ', JSON.stringify(profile, null, 1))
        User.updateOne({ google_id: profile._json.sub }, {
            google_id: profile._json.sub,
            display_name: profile._json.name,
            email: profile._json.email,
            picture: profile._json.picture
        }, { upsert: true }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport