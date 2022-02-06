const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/google-authenticator', (error) => {
    if(error) throw error
    else console.log('Connection established with mongo')
});

const User = mongoose.model('User', {
    google_id: String,
    display_name: String,
    email: String,
    picture: String,
});

module.exports = User