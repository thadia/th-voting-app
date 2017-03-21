var server = require('express');
var port = process.env.PORT || 3500;
var app = server();
app.use(server.static(__dirname + '/public'));
app.use('/bower_components', server.static(__dirname + '/bower_components'));
app.use('/client', server.static(__dirname + '/client'));
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectID;

var user = {};


var passport = require('passport');
var strategy = require('passport-twitter').Strategy;

passport.use(new strategy({
        consumerKey: "ConsumerKeyHERE",
        consumerSecret: "ConsumerSecretHERE",
        callbackURL: "http://th-voting-app.herokuapp.com/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, cb) {
        user.id = profile.id;
        user.name = profile.username;
        console.log("PROFILE: " + profile.username);
        this.redirect('/home'); //+profile.id);

        /* User.findOrCreate({ twitterId: profile.id }, function (err, user) {
           return cb(err, user);
         });*/
    }
));

//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitter', passport.authenticate('twitter'));


app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
    user.id = null;
    user.name = null;
});


var ItemSchema = new Schema({
    item: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number,
        required: false,
        trim: true
    }

});

var PoolSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    list: {
        type: Array,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    voters: {
        type: Array,
        required: false,
        trim: true
    }

});

var Item = mongoose.model('Item', ItemSchema);
var Poll = mongoose.model('Pool', PoolSchema);

mongoose.connect('mongodb://pass:user@db:port/th-voting-app-db');

app.listen(port, function () {
    console.log('Ready: ' + port);
});

app.get('/polls/post/:title/:list', function (req, res) {

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }



    console.log("Title: " + req.params.title + "List: " + req.params.list);
    var itemList = req.params.list.split(',');
    var newArray = [];
    for (var i = 0; i < itemList.length; i++) {
        var item = new Item({
            item: toTitleCase(itemList[i].trim()),
            count: 0
        });
        newArray.push(item);
    }
    var poll = new Poll({
        title: toTitleCase(req.params.title.trim()),
        list: newArray,
        owner: user.id
    });

    poll.save(function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data + " is saved.");
        }
    });
    res.redirect('/home');

});


app.get('/', function (req, res) {
    var fileName = path.join(__dirname, '/client/viewPools.html');
    res.sendFile(fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/home', function (req, res) {
    var fileName = path.join(__dirname, '/client/addPools.html');
    if (user.id) {
        console.log(user.id + " User ");
        res.sendFile(fileName, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            } else {
                console.log('Sent:', fileName);
            }
        });
    } else {
        res.redirect('/');
    }
});

app.get('/polls/all', function (req, res) {

    Poll.find({}, '-_id', {
        limit: 10
    }, function (err, latest_data) {
        if (err) return console.error(err);
        else {
            //console.log("latest_data " + latest_data);
            res.json(latest_data);
        }
    });

});


app.get('/username', function (req, res) {
    var obj = {
        "userid": user.id,
        "username": user.name
    };
    res.send(obj);
});

app.get('/voters/:title', function (req, res) {

    Poll.findOne({
        title: req.params.title
    }, function (err, item) {
        if (item) {
            console.log(item.voters);
            res.json(item.voters);
        }
        if (err) {
            console.log('error on viewChart');
        }
    });
});


app.get('/myip', function (req, res) {

    var myip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    res.send(myip);

});

app.get('/polls/remove_all', function (req, res) {

    Poll.remove({}, function (err) {
        if (!err) {
            console.log('notification removing!');
        } else {
            console.log('error on removing');
        }
    });

});


app.get('/polls/remove/:poolName', function (req, res) {
    Poll.remove({
        title: req.params.poolName
    }, function (err) {
        if (!err) {
            console.log('notification removing!');
        } else {
            console.log('error on removing');
        }
    });
    res.redirect('/home');
});


function searchIfVoted(userId, list) {
    for (var i = 9; i < list.length; i++) {
        if (userId == list[i])
            return true;
    }
    return false;
}


app.get('/polls/vote/:poolName/:itemType', function (req, res) {

    Poll.findOne({
        title: req.params.poolName
    }, function (err, item) {
        console.log("BOOLEAN " + searchIfVoted(user.id, item.voters));


        if (searchIfVoted(user.id, item.voters) != true) {

            if (item) {
                for (var i = 0; i < item.list.length; i++) {
                    if (item.list[i].item == req.params.itemType) {
                        console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> Before update.");
                        item.list[i].count += 1;
                        item.voters.push(user.id);
                        item.markModified('list.' + i + '.count');
                        console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> After update.");
                    }
                }

                if (err) {
                    console.log('error on find_update');
                }

                item.save(function (err, item) {
                    if (err) {
                        console.log('error on save_update');
                    } else {
                        res.send(item);
                        console.log('Data is saved: ' + item);
                    }
                });


            }
        } else {
            console.log('Data is not saved: You already voted');
        }


    });

});



app.get('/polls/vote/:ip/:poolName/:itemType', function (req, res) {

    Poll.findOne({
        title: req.params.poolName
    }, function (err, item) {
        console.log("BOOLEAN " + searchIfVoted(req.params.ip, item.voters));


        if (searchIfVoted(req.params.ip, item.voters) != true) {

            if (item) {
                for (var i = 0; i < item.list.length; i++) {
                    if (item.list[i].item == req.params.itemType) {
                        console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> Before update.");
                        item.list[i].count += 1;
                        item.voters.push(req.params.ip);
                        item.markModified('list.' + i + '.count');
                        console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> After update.");
                    }
                }

                if (err) {
                    console.log('error on find_update');
                }

                item.save(function (err, item) {
                    if (err) {
                        console.log('error on save_update');
                    } else {
                        res.send(item);
                        console.log('Data is saved: ' + item);
                    }
                });


            }
        } else {
            console.log('Data is not saved: You already voted');
        }


    });

});



app.get('/polls/honda', function (req, res) {

    Poll.findOne({
        title: "Cars"
    }, function (err, item) {
        if (item) {
            console.log(item);
            if (err) {
                console.log('error on save_update');
            }
        }
    });
});


app.get('/polls/viewChart/:title', function (req, res) {

    Poll.findOne({
        title: req.params.title
    }, function (err, item) {
        if (item) {
            console.log(item);
            res.json(item);
        }
        if (err) {
            console.log('error on viewChart');
        }
    });
});