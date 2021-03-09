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
router.get('/career', homeCtrl.showCareer);
router.get('/forgotPassword', homeCtrl.showForgotPassword);
router.get('/notFound', homeCtrl.showNotFound);

//dynamic routes

router.post('/addBrands', homeCtrl.addBrands);
router.post('/deleteBrands', homeCtrl.deleteBrands);

router.post('/addLogo', homeCtrl.addLogo);
router.post('/deleteLogo', homeCtrl.deleteLogo);

router.post('/addLanding', homeCtrl.addLanding);
router.post('/deleteLanding', homeCtrl.deleteLanding);

router.post('/addAbout', homeCtrl.addAbout);
router.post('/deleteAbout', homeCtrl.deleteAbout);

router.post('/addContact', homeCtrl.addContact);
router.post('/deleteContact', homeCtrl.deleteContact);

router.post('/addCareer', homeCtrl.addCareer);
router.post('/deleteCareer', homeCtrl.deleteCareer);

router.post('/addFaq', homeCtrl.addFaq);
router.post('/deleteFaq', homeCtrl.deleteFaq);

router.post('/addBrandsHeader', homeCtrl.addBrandsHeader);
router.post('/deleteBrandsHeader', homeCtrl.deleteBrandsHeader);

router.post('/newsLetter', homeCtrl.submitNewsLetter);
router.post('/contact', homeCtrl.postContact);
router.post('/forgotPassword', homeCtrl.postForgotPassword);
router.get('/user/:categoryId/:subCategoryId?', homeCtrl.showCategoryProductsUser);
router.post('/deleteSubCategory/:categoryId', homeCtrl.deleteSubCategory);


router.post('/addCategory', homeCtrl.addCategory);
router.post('/deleteCategory', homeCtrl.deleteCategory);

router.post('/admin-delete', homeCtrl.deleteProduct);
router.get('/admin-category/:categoryId/:editId?', homeCtrl.showCategoryProducts);
router.post('/admin-category-add/:categoryId/:editId?', homeCtrl.addCategoryProduct);
router.get('/admin-subCategory/:categoryId/:subCategoryId/:editId?', homeCtrl.showSubCategoryProducts);
router.post('/admin-subCategory-add/:categoryId/:subCategoryId/:editId?', homeCtrl.addSubCategoryProduct);
router.post('/admin-subCategory-add/multiple', homeCtrl.addSubCategoryMultiple);
router.post('/addSubCategory/:categoryId', homeCtrl.addSubCategory);
router.post('/admin-edit', homeCtrl.showEditProduct);


router.post('/login', homeCtrl.postLogin);

module.exports = router;