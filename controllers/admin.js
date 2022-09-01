const Product = require('../models/product');

exports.managerProductsPage = (req, res, next) => {
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
                pageTitle: 'All Products',
                pageInfo: 'Products we have',
                path: '/products',
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

exports.manageProducts = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    Product
        .find()
        .then(products => {
            res.render('manageProducts', {
                pageTitle: 'Manage your Products',
                path: '/admin/manage-products',
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

exports.getAddProducts = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    res.render('edit-product', {
        pageTitle: 'Add a Product',
        path: '/admin/add-product',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        editing: false,
        totalQuantity: totalQuantity
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const newProduct = req.body.newProduct;
    const sale = req.body.sale;
    const category = req.body.category;
    const gender = req.body.gender;
    const oldPrice = req.body.oldPrice;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        quantity: quantity,
        newProduct: newProduct,
        sale: sale,
        oldPrice: oldPrice,
        category: category,
        gender: gender,
        userId: req.session.user
    });
    product
        .save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/manage-products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    Product
        .find()
        .then(products => {
            const editMode = req.query.edit;
            if (!editMode) {
                return res.redirect('/');
            }
            const prodId = req.params.productId;
            Product.findById(prodId)
                .then(product => {
                    if (!product) {
                        return res.redirect('/');
                    }
                    console.log(product);
                    res.render('edit-product', {
                        products: products,
                        pageTitle: 'Edit Product',
                        path: '/edit-product',
                        editing: editMode,
                        product: product,
                        isAuth: req.session.isLoggedIn,
                        user: req.user,
                        totalQuantity
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => { console.log(err); })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedQuantity = req.body.quantity;
    const updatedNewProduct = req.body.newProduct;
    const updatedSale = req.body.sale;
    const updatedOldPrice = req.body.oldPrice;
    const updatedCat = req.body.category;
    const updatedGender = req.body.gender;

    console.log("this is: " + prodId);

    Product.findById(prodId)
        .then(product => {
            console.log(product);
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            product.category = updatedCat;
            product.quantity = updatedQuantity;
            product.newProduct = updatedNewProduct;
            product.updatedSale = updatedSale;
            product.oldPrice = updatedOldPrice;
            product.category = updatedCat;
            product.gender = updatedGender;
            return product.save();
        })
        .then(result => {
            console.log(result);
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/manage-products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/manage-products');
        })
        .catch(err => console.log(err));
};
