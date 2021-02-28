var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl')

/* GET home page. */

// static routes

router.get('/', homeCtrl.showHome);
router.get('/logout', homeCtrl.logout);
router.get('/login', homeCtrl.showLogin);
router.get('/contact', homeCtrl.showContact);
router.get('/brands', homeCtrl.showBrands);
router.get('/faq', homeCtrl.showFaq);
router.get('/carrier', homeCtrl.showCarrier);
router.get('/notFound', homeCtrl.showNotFound);

//dynamic routes

router.get('/user/:categoryId/:subCategoryId?', homeCtrl.showCategoryProductsUser);
router.post('/deleteSubCategory/:categoryId', homeCtrl.deleteSubCategory);
router.post('/admin-delete', homeCtrl.deleteProduct);
router.get('/admin-category/:categoryId/:editId?', homeCtrl.showCategoryProducts);
router.post('/admin-category-add/:categoryId/:editId?', homeCtrl.addCategoryProduct);
router.get('/admin-subCategory/:categoryId/:subCategoryId/:editId?', homeCtrl.showSubCategoryProducts);
router.post('/admin-subCategory-add/:categoryId/:subCategoryId/:editId?', homeCtrl.addSubCategoryProduct);
router.post('/addSubCategory/:categoryId', homeCtrl.addSubCategory);
router.post('/admin-edit', homeCtrl.showEditProduct);
router.post('/login', homeCtrl.postLogin);

module.exports = router;