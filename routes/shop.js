const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.home);

router.get('/shop', shopController.shopNow);

router.get('/contactUs', shopController.contactUs);

router.get('/shop/men', shopController.getMenProducts);

router.get('/shop/women', shopController.getWomenProducts);

router.get('/shop/men/:productId', shopController.getProduct);

router.get('/shop/women/:productId', shopController.getProduct);

router.get('/checkout', isAuth, shopController.checkout);

router.get('/cart', isAuth, shopController.getCart);

router.post('/addToCart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/clearCart', isAuth, shopController.postClearCart);

router.post('/emptyCart', isAuth, shopController.postClearCart);

router.post('/orderSuccessfullyPlaced', isAuth, shopController.postOrder);

module.exports = router;