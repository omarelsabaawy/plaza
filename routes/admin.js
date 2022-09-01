const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');

const router = express.Router();

router.get('/admin/manage-products', isManager, isAuth, adminController.manageProducts);

router.get('/admin/add-product', isManager, isAuth, adminController.getAddProducts);

router.post('/admin/add-product', isAuth, adminController.postAddProduct);

router.get('/admin/edit-product/:productId', isManager, isAuth, adminController.getEditProduct); //here

router.post('/admin/edit-product', isManager, isAuth, adminController.postEditProduct);

router.post('/admin/delete-product', isManager, isAuth, adminController.postDeleteProduct);

router.get('/admin/products', isManager, isAuth, adminController.managerProductsPage);

module.exports = router;