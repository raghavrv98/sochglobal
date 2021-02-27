var mysql = require('mysql')
var mailUtils = require('./../utils/mail-utils')

var message = '';
module.exports = {

    
    showHome: (req, res, next) => {
        res.render('index');
    },
    
    logout: (req, res, next) => {
        req.session.destroy(function (err) {
            res.redirect("/login");
        })
    },

    showLogin: (req, res, next) => {
        res.render('login');
    },

    showContact: (req, res, next) => {
        res.render('contact');
    },

    showBrands: (req, res, next) => {
        res.render('brands');
    },

    showAdmin: (req, res, next) => {
        res.render('admin');
    },

    showCarrier: (req, res, next) => {
        res.render('carrier');
    },
    
    showFaq: (req, res, next) => {
        res.render('faq');
    },

    showNotFound: (req, res, next) => {
        res.render('notFoud');
    },

    showProducts: (req, res, next) => {
        res.render('products');
    },

    postLogin: (req, res, next) => {
        res.redirect('/admin');
    },

}
