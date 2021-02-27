var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl')

/* GET home page. */

router.get('/', homeCtrl.showHome);
router.get('/logout', homeCtrl.logout);
router.get('/login', homeCtrl.showLogin);
router.get('/contact', homeCtrl.showContact);
router.get('/brands', homeCtrl.showBrands);
router.get('/admin', homeCtrl.showAdmin);
router.get('/faq', homeCtrl.showFaq);
router.get('/products', homeCtrl.showProducts);
router.get('/carrier', homeCtrl.showCarrier);
router.get('/notFound', homeCtrl.showNotFound);


router.post('/login', homeCtrl.postLogin);


module.exports = router;