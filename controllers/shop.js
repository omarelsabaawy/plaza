const Product = require('../models/product');

exports.home = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    res.render('index', {
        pageTitle: 'home page',
        path: '/',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        totalQuantity: totalQuantity
    });
};


exports.getProduct = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }
    const prodId = req.params.productId;
    Product
        .findById(prodId)
        .then(product => {
            Product
                .find({ category: product.category })
                .then(relatedProducts => {
                    res.render('product', {
                        pageTitle: product.title,
                        isAuth: req.session.isLoggedIn,
                        user: req.user,
                        product: product,
                        relatedProducts: relatedProducts,
                        totalQuantity: totalQuantity
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.shopNow = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    Product
        .find()
        .then(products => {
            res.render('categorie', {
                pageTitle: 'Shop now',
                pageInfo: 'Clothes',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: products,
                totalQuantity: totalQuantity
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.contactUs = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    res.render('contact', {
        pageTitle: 'contactUs',
        path: '/contactUs',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        totalQuantity: totalQuantity
    });
};

exports.getMenProducts = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    Product
        .find({ gender: 'Male' })
        .then(products => {
            res.render('categorie', {
                pageTitle: 'Shopping in Men Products',
                pageInfo: 'Men Clothes',
                path: '/shop/Men',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: products,
                totalQuantity: totalQuantity
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getWomenProducts = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    Product
        .find({ gender: 'Female' })
        .then(products => {
            res.render('categorie', {
                pageTitle: 'Shopping in Women Products',
                pageInfo: 'Women Clothes',
                path: '/shop/Women',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: products,
                totalQuantity: totalQuantity
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            let totalPrice = 0;
            let totalQuantity = 0;
            for (item of user.cart.items) {
                totalPrice += item.productId.price * item.quantity;
                totalQuantity += item.quantity;
            }
            res.render('cart', {
                path: '/cart',
                pageTitle: 'your Cart',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: user.cart.items,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity
            });
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const prodSize = req.body.size;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product, prodSize);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const productSize = req.body.size;
    req.user
        .removeFromCart(prodId, productSize)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postClearCart = (req, res, next) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    req.user
        .clearCart()
        .then(products => {
            res.render('cart', {
                path: '/cart',
                pageTitle: 'your Cart',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: products,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.checkout = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .then(user => {
            let totalPrice = 0;
            let totalQuantity = 0;
            for (item of user.cart.items) {
                totalPrice += item.productId.price * item.quantity;
                totalQuantity += item.quantity;
            }
            res.render('checkout', {
                path: '/checkout',
                pageTitle: 'Checkout',
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: user.cart.items,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity
            });
        });
};

exports.postOrder = (req, res, next) => {
    let totalPrice = 0;
    let totalQuantity = 0;
    res.render('order', {
        path: '/order',
        pageTitle: 'Thanks for ordering',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        products: user.cart.items,
        totalPrice: 0,
        totalQuantity: 0
    });
};