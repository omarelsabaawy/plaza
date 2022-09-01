const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const serverless = require('serverless-http');

const MONGODB_URI = 'mongodb+srv://DevSolutions:8ttM5kVi6BqOe2ol@cluster0.8t7rw.mongodb.net/thePlaza';

const app = express();

const store = new mongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

const User = require('./models/user');

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

errorController = require('./controllers/error');
app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('Connect!');
        serverless(app);
    })
    .catch(err => {
        console.log(err);
    });