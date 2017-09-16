const express = require('express');
const jwt = require('jsonwebtoken');

const utils = require('./utils');
const User = require('./models/user');
const Report = require('./models/report');
const Comment = require('./models/comment');
const config = require('./config');

const apiRouter = express.Router();

apiRouter.get('/', (req,res)=>{
    res.json({message: 'Welcome to api router'});
});
apiRouter.post('/register', (req,res)=>{
    const { username, email, first_name, last_name, password } = req.body;
    const user = new User({
        username: username.trim(),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim(),
        password: password.trim(),
    });
    utils.checkUsername(user.username)
        .then(
            () => utils.checkEmail(user.email)
        ).then(
            () => user.save()
        ).then(()=>{ res.json({success: true}); console.log(`User "${user.first_name} ${user.last_name}" registered`);})
        .catch(message => { res.json({success: false, message}) });
});

apiRouter.post('/authenticate', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password) res.json({success: false, message: "Not enough parameters"});
    else
        User.findOne({
           email,
           password,
        },{password: false /*omit password*/ }, (err,user)=>{
           if(err){ //if has errors
               res.json({success: false});
               throw err;
           }else{ //if it doesn't have errors
               if(user){ //if we found a user in db
                   const token = jwt.sign(user, config.secret, { //generate token
                       expiresIn: config.token_expiration
                   });
                   //set user profile image
                    if(user.profile_image ===''){
                        user.profile_image = 'default.png';
                    }
                   //return user
                   res.json({success:true, user, token});
                   utils.log(`User "${user.username}" authenticated`);
               } else res.json({success: false, message: "Invalid credentials"}); //no user has been found
           }
        });
});

apiRouter.use((req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){ //sign the user with the token
        jwt.verify(token, config.secret, (err, decoded)=>{ //verify token
            if(err) return res.json({success: false, message: "Failed to authenticate user"});
            else {
                req.decoded = decoded; //save the request to use in other routes
                next();
            }
        });
    }else{
        res.status(403).send({
            success: false,
            message: 'Not token provided'
        });
    }
});

apiRouter.get('/user', (req,res)=>{
    const { id } = req.query;
    let query = {};
    if(id && id!=='undefined')
        query = {_id: id};
    else
        query = {_id: req.decoded._doc._id};
    User.findOne(query,{password: false /*getting rid of password*/}, (err,user)=>{
        //set user profile image
        if(user.profile_image === ''){ //THIS IS THE ERROR
            user.profile_image = 'default.png';
        }
        res.json(user);
    });
});

apiRouter.post('/user', (req,res)=>{
    const { type, data } = req.body;
    if(type === 'info'){
        const { car, county, address, sex, birthday, phone } = data;
        User.findByIdAndUpdate(req.decoded._doc._id, {car, county, address, sex, birthday, phone})
            .exec(err => {
                if(err) throw err;
                res.json({success: true});
            });
    }else if(type === 'account'){
        const { username, first_name, last_name, email } = data;
        utils.checkUsername(username, req.decoded._doc.username)
            .then(
                () => utils.checkEmail(email, req.decoded._doc.email),
                message => res.json({success: false, message})
            ).then(
                () => User.findByIdAndUpdate(req.decoded._doc._id, {username, first_name, last_name, email})
                    .exec(),
                message => res.json({success: false, message})
            ).then(() => res.json({success: true}))
        .catch(err => {throw err;});

    }else if(type === 'password'){
        const { oldPass, newPass } = data;
        utils.checkPassword(req.decoded._doc._id, oldPass)
            .then(
                () => User.findByIdAndUpdate(req.decoded._doc._id, {password: newPass})
                    .exec(),
                message => res.json({success: false, message})
            )
            .then(() => res.json({success: true}))
            .catch(err => {throw err;})
    }
});

apiRouter.post('/user/image', (req,res)=>{
    const { image } = req.body;


    const imageName = utils.writeImage(JSON.parse(image));
    User.findByIdAndUpdate(req.decoded._doc._id, {profile_image: imageName})
        .exec(err => {
            if(err) throw err;
            res.json({success: true, image: imageName});
            utils.log('User ' + req.decoded._doc.username + ' changed his profile image ' + image)
        });
});

apiRouter.get('/report', (req,res)=>{
    let { limit, skip, search, user_id } = req.query;
    if(!search || search === 'undefined') search = '';
    const reg = new RegExp('.*'+ search +'.*');

    const querySearch = { $or: [{title: reg},{location: reg}]};
    const queryUser = {user_id};
    Report.find(user_id ? queryUser : querySearch)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({created_at: -1})
        .exec((err,response)=>{

            res.json(response);
        });

});
apiRouter.delete('/report', (req,res)=>{
    const { id } = req.body;
    if(!id) res.json({success: false, message: 'Id is required'});

    Report.remove({_id: id}, err=>{
        if(err) throw err;
        res.json({success: true});
    });
});



apiRouter.post('/report', (req,res)=>{
    let { title, description, type, severity, images, location } = req.body;
    let imageNames = [];

    for(let image of JSON.parse(images)) {

        const imageName = utils.writeImage(image);
        imageNames.push(Object.assign(image, {uri: imageName})); //see https://github.com/nodejs/node/issues/3851 rip spread operator for newer versions of nodejs

    }
    //add new report in db

    const report = new Report({
        title,
        description,
        type,
        severity,
        images: imageNames,
        location,
        user_id: req.decoded._doc._id,
    });

    report.save(err=>{
        if(err) throw err;
        utils.log(`Report "${title}" added`);
    });

    res.json(req.body);

});

apiRouter.get('/comments', (req,res)=>{
    const { report_id } = req.query;
    Comment.find({report_id})
        .sort({created_at: -1})
        .exec((err, comments)=>{
        res.json(comments);
    });
});

apiRouter.post('/comments', (req,res)=>{
    const { report_id, content } = req.body;
    const comment = new Comment({
        report_id,
        user_id: req.decoded._doc._id,
        content,
    });
    comment.save(err=>{
        if(err) throw err;
        utils.log(`A comment has been added`);
    });

    res.json({success: true});
});
apiRouter.post('/comments/like', (req,res)=>{
    const { id } = req.body;
    if(!id) res.json({success: false, message: 'Id is required'});

    const like = {user_id: req.decoded._doc._id, created_at: new Date()};

    Comment.findByIdAndUpdate(id, { $push: { useful: like } } )
        .exec((err) => {
            if(err) throw err;
            res.json({success: true});
        });
});
apiRouter.delete('/comments/like', (req,res)=>{
    const { id } = req.body;
    if(!id) res.json({success: false, message: 'Id is required'});


    Comment.findById(id)
        .exec((err,comment) => {
            comment.useful = comment.useful.filter(e => e.user_id !== req.decoded._doc._id);
            comment.save(err=>{
                if(err) throw(err);
                res.json({success: true});
            });
        });
});
module.exports = apiRouter;