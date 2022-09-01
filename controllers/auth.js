const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    res.render('login', {
        pageTitle: 'login',
        path: '/login',
        isAuth: false,
        totalQuantity: totalQuantity,
        errorMessage: req.flash('error')
    });
};

exports.getRegister = (req, res, next) => {
    let totalQuantity = 0;
    res.render('register', {
        pageTitle: 'Registration',
        path: '/Registration',
        isAuth: false,
        totalQuantity: totalQuantity
    });
};

exports.postRegister = (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isManager = false;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/Registration');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    if (confirmPassword == password) {
                        const user = new User({
                            fname: fname,
                            lname: lname,
                            email: email,
                            password: hashedPassword,
                            isManager: isManager,
                            cart: { items: [] }
                        });
                        return user.save();
                    }
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log(req.session.user);
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};
