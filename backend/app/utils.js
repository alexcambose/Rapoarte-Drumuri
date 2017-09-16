const User = require('./models/user');
const colors = require('colors');
const config = require('./config');
module.exports.log = message => {
    console.log(message.green);
};

module.exports.writeImage = image => {

    const ext = image.uri.split(';')[0].match(/jpeg|jpg|png/)[0];


    const random = require('crypto').randomBytes(36).toString('hex');
    const theImage = image.uri.replace(/^data:image\/\w+;base64,/, "");

    const imageName = `${random}.${ext}`;

    require('fs').writeFile(config.publicDir+`/${imageName}`, theImage, 'base64', err => {
        if(err) console.log('Error writing image to disk', err);
        else console.log(`Image ${imageName} has been written to disk!`);
    });
    return imageName;

};

module.exports.checkUsername = (username, myUsername)=> {
    return new Promise((resolve, reject) => {
        User.findOne({username})
            .exec((err,user)=>{
                if(user && myUsername !== username) reject("Numele de utilizator este deja luat!"); //if the username exists and it is different than the old one
                else resolve();
            });
    });
};

module.exports.checkEmail = (email, myEmail) => {
    return new Promise((resolve, reject) => {
        User.findOne({email})
            .exec((err, user) => {
                if(user && myEmail !== email) reject("Acest email este deja luat!"); //if the email exists and it is different than the old one
                else resolve();
            });
    });
};

module.exports.checkPassword = (_id, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({_id})
            .exec((err, user) => {
                if(user.password === password) resolve("Parola actuala incorecta!");
                else reject();
            });
    });
};