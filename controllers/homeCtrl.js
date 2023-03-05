var mysql = require('mysql')
var mailUtils = require('./../utils/mail-utils')
const csv = require('csv-parser')
const fs = require('fs')
var sessionStorage = require('sessionstorage');

var message = '';
const fetch = require('node-fetch');

module.exports = {

    showLogin: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                var message = ""
                var registerMessage = ""
                res.render('login', {
                    message,
                    logo,
                    session,
                    registerMessage
                });
            }
        })
    },

    showHome: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var landing = home.find(val => val.type == "landing") ? home.find(val => val.type == "landing").img : "noImage.jpg"
                var about = home.find(val => val.type == "about") ? home.find(val => val.type == "about").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')

                res.render('index', { logo, landing, about, session });
            }
        })
    },

    showContact: (req, res, next) => {
        var message = ""

        var sql = "select * from contact";
        var query = db.query(sql, function (err, contact) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                contact = contact[0] ? contact[0].img : "noImage.jpg"

                var sql = "select * from home";
                var query = db.query(sql, function (err, home) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                        var session = sessionStorage.getItem('username')

                        res.render('contact', {
                            message,
                            logo,
                            contact,
                            session
                        });
                    }
                })
            }
        })
    },

    postContact: (req, res, next) => {

        var email = req.body.email
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var phoneNumber = req.body.phoneNumber
        var countryRegion = req.body.countryRegion
        var companyName = req.body.companyName
        var message = req.body.message
        var websiteUrl = req.body.websiteUrl
        let token = req.body.token

        // Example POST method implementation:
        async function postData(url = "") {

            const SECRET_KEY = '6LfnsLYkAAAAAHbuJqgzkuIlgD0xk9t9rgI1cxmx';
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${SECRET_KEY}&response=${token}`,
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        postData("https://google.com/recaptcha/api/siteverify").then((data) => {

            var sql = "select * from contact";
            var query = db.query(sql, function (err, contact) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    contact = contact[0] ? contact[0].img : "noImage.jpg"

                    var sql = "select * from home";
                    var query = db.query(sql, function (err, home) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"

                            if (data.success) {

                                var messageBody =
                                    "\n Email : " + email +
                                    "\n First Name : " + firstName +
                                    "\n Last Name : " + lastName +
                                    "\n Country Region : " + countryRegion +
                                    "\n Phone Number : " + phoneNumber +
                                    "\n Company Name : " + companyName +
                                    "\n Message : " + message +
                                    "\n Website Url : " + websiteUrl

                                var session = sessionStorage.getItem('username')

                                mailUtils.sendMail('rd@sochglobal.com', "Enquiry Mail", messageBody)
                                message = "Message send successfully. Please wait we will contact you soon."

                            }
                            else {
                                message = "false"
                            }

                            res.render('contact', {
                                message,
                                logo,
                                session,
                                contact,
                            });
                        }
                    });
                }
            })
        });
    },

    showCareer: (req, res, next) => {

        var sql = "select * from career_description";
        var query = db.query(sql, function (err, description) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                description = description[0] ? description[0].description : "Currently No Positions"

                var sql = "select * from career";
                var query = db.query(sql, function (err, career) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        career = career[0] ? career[0].img : "noImage.jpg"

                        var sql = "select * from home";
                        var query = db.query(sql, function (err, home) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                                var session = sessionStorage.getItem('username')
                                res.render('career', { logo, career, session, description });
                            }
                        })
                    }
                })
            }
        })
    },

    showFaq: (req, res, next) => {

        var sql = "select * from faq";
        var query = db.query(sql, function (err, faq) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                faq = faq[0] ? faq[0].img : "noImage.jpg"

                var sql = "select * from home";
                var query = db.query(sql, function (err, home) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                        var session = sessionStorage.getItem('username')
                        res.render('faq', { logo, faq, session });
                    }
                })
            }
        })
    },

    showNotFound: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                res.render('notFound', { logo, session });
            }
        })
    },

    submitNewsLetter: (req, res, next) => {

        let token = req.body.token

        // Example POST method implementation:
        async function postData(url = "") {

            const SECRET_KEY = '6LfnsLYkAAAAAHbuJqgzkuIlgD0xk9t9rgI1cxmx';
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${SECRET_KEY}&response=${token}`,
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        postData("https://google.com/recaptcha/api/siteverify").then((data) => {
            console.log('data: ', data);

            if (data?.success) {

                var email = req.body.emailId

                var messageBodyForCompany = "User Email-id for Subscription: " + email
                var messageBodyForUser = "Thanks for subscribe to SochGlobal. You will now get latest udates."

                mailUtils.sendMail('info@sochglobal.com', "Enquiry Mail", messageBodyForCompany)
                mailUtils.sendMail(email, "Congratulations", messageBodyForUser)
            }
            else {
                console.log("error--", data?.['error-codes']);
            }
            res.redirect('/');
        })
    },

    showBrands: (req, res, next) => {

        var sql = "select * from brands_header";
        var query = db.query(sql, function (err, brandsHeader) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                brandsHeader = brandsHeader[0] ? brandsHeader[0].img : "noImage.jpg"

                var sql = "select * from home";
                var query = db.query(sql, function (err, home) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"

                        var sql = "select * from brands";
                        var query = db.query(sql, function (err, brands) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                var session = sessionStorage.getItem('username')
                                res.render('brands', {
                                    brands,
                                    logo,
                                    brandsHeader,
                                    session
                                });
                            }
                        })
                    }
                })
            }
        })
    },

    postLogin: (req, res, next) => {
        var email = req.body.emailId
        var password = req.body.password

        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"

                var sql = "select * from login_cred";
                var query = db.query(sql, function (err, rows) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        var selectedObject = rows.find(val => val.email === email && val.password === password)

                        if (selectedObject) {

                            if (selectedObject.type === 'admin') {

                                if (selectedObject.status) {
                                    req.session.userId = selectedObject.id;
                                    res.redirect('admin-category/computers');
                                }
                                else {
                                    message = "Your account is not activated yet.";
                                    var registerMessage = ""
                                    var session = sessionStorage.getItem('username')
                                    res.render('login', {
                                        message,
                                        logo,
                                        registerMessage,
                                        session
                                    });
                                }
                            }
                            else {

                                if (selectedObject.status) {
                                    sessionStorage.setItem('username', selectedObject.email)
                                    res.redirect("/user/computers");
                                }
                                else {
                                    message = "Your account is not activated yet.";
                                    var registerMessage = ""
                                    var session = sessionStorage.getItem('username')
                                    res.render('login', {
                                        message,
                                        logo,
                                        registerMessage,
                                        session
                                    });
                                }
                            }
                        }
                        else {
                            message = "Login Credentials are wrong";
                            var registerMessage = ""
                            var session = sessionStorage.getItem('username')
                            res.render('login', {
                                message,
                                logo,
                                registerMessage,
                                session
                            });
                        }

                    }
                })

            }
        });
    },

    logout: (req, res, next) => {
        sessionStorage.clear();
        req.session.destroy(function (err) {
            res.redirect("/login");
        })
    },


    showCategoryProducts: (req, res, next) => {

        var categoryId = req.params.categoryId
        var editId = req.params.editId ? req.params.editId : ""
        var subCategoryId = ""
        var displayCategoryId = ""
        var displaySubCategoryId = ""
        var editProduct = ""
        var dropdownList = ""
        var editRedirect = false
        var categoryRedirect = true
        var message = ""
        var dropdownListCategory = []
        var dropdownListCategoryUpdated = []

        var sql = "select * from career_description";
        var query = db.query(sql, function (err, description) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                description = description[0] ? description[0].description : "Currently No Positions"

                var sql = "select * from login_cred";
                var query = db.query(sql, function (err, adminUsers) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {

                        adminUsers = adminUsers.filter(val => val.type === "user")

                        var sql = "select * from brands_header";
                        var query = db.query(sql, function (err, brandsHeader) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                brandsHeader = brandsHeader[0] ? brandsHeader[0].img : "noImage.jpg"

                                var sql = "select * from faq";
                                var query = db.query(sql, function (err, faq) {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    else {
                                        faq = faq[0] ? faq[0].img : "noImage.jpg"

                                        var sql = "select * from career";
                                        var query = db.query(sql, function (err, career) {
                                            if (err) {
                                                return res.status(500).send(err);
                                            }
                                            else {
                                                career = career[0] ? career[0].img : "noImage.jpg"

                                                var sql = "select * from contact";
                                                var query = db.query(sql, function (err, contact) {
                                                    if (err) {
                                                        return res.status(500).send(err);
                                                    }
                                                    else {
                                                        contact = contact[0] ? contact[0].img : "noImage.jpg"

                                                        var sql = "select * from home";
                                                        var query = db.query(sql, function (err, home) {
                                                            if (err) {
                                                                return res.status(500).send(err);
                                                            }
                                                            else {
                                                                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                                                                var landing = home.find(val => val.type == "landing") ? home.find(val => val.type == "landing").img : "noImage.jpg"
                                                                var about = home.find(val => val.type == "about") ? home.find(val => val.type == "about").img : "noImage.jpg"

                                                                var sql = "select * from brands";
                                                                var query = db.query(sql, function (err, brands) {
                                                                    if (err) {
                                                                        return res.status(500).send(err);
                                                                    }
                                                                    else {

                                                                        var productCategoryList = []

                                                                        var sql = 'SELECT * FROM product_categories';
                                                                        var query = db.query(sql, function (err, product_categories) {
                                                                            if (err) {
                                                                                return res.status(500).send(err);
                                                                            }
                                                                            else {

                                                                                var displayCategory = []
                                                                                for (var i in product_categories) {
                                                                                    displayCategory.push(product_categories[i].displayCategory)
                                                                                    displayCategory = [...new Set(displayCategory)]
                                                                                }

                                                                                var category = []
                                                                                for (var i in product_categories) {
                                                                                    category.push(product_categories[i].category)
                                                                                    category = [...new Set(category)]
                                                                                }

                                                                                for (var i = 0; i < displayCategory.length; i++) {
                                                                                    var catArr = product_categories.filter(val => val.category == category[i])
                                                                                    var subCategory = {}

                                                                                    catArr.map(val => {
                                                                                        if (val.displaySubCategory.length > 0) {
                                                                                            subCategory[val.displaySubCategory] = val.subCategory
                                                                                        }
                                                                                    })

                                                                                    productCategoryList.push({
                                                                                        displayName: displayCategory[i],
                                                                                        name: category[i],
                                                                                        subCategory: subCategory
                                                                                    })
                                                                                }

                                                                                var dropdownlistObject = productCategoryList.find(val => val.name == categoryId)

                                                                                if (dropdownlistObject) {
                                                                                    var requiredPair = Object.entries(dropdownlistObject.subCategory)
                                                                                    dropdownList = []

                                                                                    for (var i = 0; i < requiredPair.length; i++) {
                                                                                        dropdownList.push({
                                                                                            displayName: requiredPair[i][0],
                                                                                            name: requiredPair[i][1]
                                                                                        })
                                                                                    }
                                                                                    displayCategoryId = productCategoryList.find(val => val.name == categoryId).displayName

                                                                                    var sql = `SELECT * FROM ${categoryId}`;
                                                                                    var query = db.query(sql, function (err, categoryList) {
                                                                                        if (err) {
                                                                                            return res.status(500).send(err);
                                                                                        }
                                                                                        else {

                                                                                            if (editId.length > 0) {
                                                                                                editProduct = categoryList.find(val => {
                                                                                                    if (val.id == editId) {
                                                                                                        return val
                                                                                                    }
                                                                                                })
                                                                                                if (!editProduct) {
                                                                                                    editRedirect = true;
                                                                                                    message = "Edit Id does not exists";
                                                                                                }
                                                                                            }

                                                                                            product_categories.map((val, index) => {
                                                                                                dropdownListCategory.push({
                                                                                                    category: val.category,
                                                                                                    displayCategory: val.displayCategory
                                                                                                })
                                                                                            })

                                                                                            product_categories.map((val, index) => {

                                                                                                if (dropdownListCategory[index]) {
                                                                                                    if (!dropdownListCategoryUpdated.find(value => value.category == val.category)) {
                                                                                                        dropdownListCategoryUpdated.push({
                                                                                                            category: val.category,
                                                                                                            displayCategory: val.displayCategory
                                                                                                        })
                                                                                                    }
                                                                                                }
                                                                                            })


                                                                                            var session = req.session.userId;
                                                                                            res.render('admin', {
                                                                                                message,
                                                                                                productCategoryList,
                                                                                                products: categoryList,
                                                                                                editProduct,
                                                                                                categoryId,
                                                                                                subCategoryId,
                                                                                                displayCategoryId,
                                                                                                displaySubCategoryId,
                                                                                                dropdownList,
                                                                                                session,
                                                                                                editRedirect,
                                                                                                categoryRedirect,
                                                                                                brands,
                                                                                                logo,
                                                                                                contact,
                                                                                                career,
                                                                                                description,
                                                                                                faq,
                                                                                                brandsHeader,
                                                                                                landing,
                                                                                                about,
                                                                                                dropdownListCategoryUpdated,
                                                                                                adminUsers
                                                                                            });
                                                                                        }
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    message = "Category does not exist"
                                                                                    var session = req.session.userId;
                                                                                    res.render('admin', {
                                                                                        message,
                                                                                        productCategoryList,
                                                                                        categoryId,
                                                                                        subCategoryId,
                                                                                        displayCategoryId,
                                                                                        displaySubCategoryId,
                                                                                        dropdownList,
                                                                                        session,
                                                                                        editRedirect,
                                                                                        editProduct,
                                                                                        products: [],
                                                                                        categoryRedirect,
                                                                                        brands,
                                                                                        logo,
                                                                                        contact,
                                                                                        career,
                                                                                        description,
                                                                                        faq,
                                                                                        brandsHeader,
                                                                                        landing,
                                                                                        about,
                                                                                        dropdownListCategoryUpdated,
                                                                                        adminUsers
                                                                                    });

                                                                                }
                                                                            }
                                                                        })
                                                                    }

                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    showSubCategoryProducts: (req, res, next) => {
        var categoryId = req.params.categoryId
        var editId = req.params.editId ? req.params.editId : ""
        var subCategoryId = req.params.subCategoryId
        var displayCategoryId = ""
        var displaySubCategoryId = ""
        var editProduct = ""
        var editRedirect = false
        var categoryRedirect = false
        var dropdownListCategory = []
        var dropdownListCategoryUpdated = []
        message = ""

        var sql = "select * from career_description";
        var query = db.query(sql, function (err, description) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                description = description[0] ? description[0].description : "Currently No Positions"

                var sql = "select * from login_cred";
                var query = db.query(sql, function (err, adminUsers) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {

                        adminUsers = adminUsers.filter(val => val.type === "user")

                        var sql = "select * from brands_header";
                        var query = db.query(sql, function (err, brandsHeader) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                brandsHeader = brandsHeader[0] ? brandsHeader[0].img : "noImage.jpg"

                                var sql = "select * from faq";
                                var query = db.query(sql, function (err, faq) {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    else {
                                        faq = faq[0] ? faq[0].img : "noImage.jpg"

                                        var sql = "select * from career";
                                        var query = db.query(sql, function (err, career) {
                                            if (err) {
                                                return res.status(500).send(err);
                                            }
                                            else {
                                                career = career[0] ? career[0].img : "noImage.jpg"

                                                var sql = "select * from contact";
                                                var query = db.query(sql, function (err, contact) {
                                                    if (err) {
                                                        return res.status(500).send(err);
                                                    }
                                                    else {
                                                        contact = contact[0] ? contact[0].img : "noImage.jpg"


                                                        var sql = "select * from home";
                                                        var query = db.query(sql, function (err, home) {
                                                            if (err) {
                                                                return res.status(500).send(err);
                                                            }
                                                            else {
                                                                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                                                                var landing = home.find(val => val.type == "landing") ? home.find(val => val.type == "landing").img : "noImage.jpg"
                                                                var about = home.find(val => val.type == "about") ? home.find(val => val.type == "about").img : "noImage.jpg"

                                                                var sql = "select * from brands";
                                                                var query = db.query(sql, function (err, brands) {
                                                                    if (err) {
                                                                        return res.status(500).send(err);
                                                                    }
                                                                    else {

                                                                        var productCategoryList = []

                                                                        var sql = 'SELECT * FROM product_categories';
                                                                        var query = db.query(sql, function (err, product_categories) {
                                                                            if (err) {
                                                                                return res.status(500).send(err);
                                                                            }
                                                                            else {

                                                                                var displayCategory = []
                                                                                for (var i in product_categories) {
                                                                                    displayCategory.push(product_categories[i].displayCategory)
                                                                                    displayCategory = [...new Set(displayCategory)]
                                                                                }

                                                                                var category = []
                                                                                for (var i in product_categories) {
                                                                                    category.push(product_categories[i].category)
                                                                                    category = [...new Set(category)]
                                                                                }

                                                                                for (var i = 0; i < displayCategory.length; i++) {
                                                                                    var catArr = product_categories.filter(val => val.category == category[i])
                                                                                    var subCategory = {}

                                                                                    catArr.map(val => {
                                                                                        if (val.displaySubCategory.length > 0) {
                                                                                            subCategory[val.displaySubCategory] = val.subCategory
                                                                                        }
                                                                                    })

                                                                                    productCategoryList.push({
                                                                                        displayName: displayCategory[i],
                                                                                        name: category[i],
                                                                                        subCategory: subCategory
                                                                                    })
                                                                                }
                                                                                displayCategoryId = productCategoryList.find(val => val.name == categoryId).displayName

                                                                                var categoryObject = productCategoryList.find(val => val.name == categoryId)
                                                                                var requiredPair = Object.entries(categoryObject.subCategory).find(key => {
                                                                                    if (key[1] == subCategoryId) {
                                                                                        return key
                                                                                    }
                                                                                })
                                                                                if (requiredPair) {
                                                                                    displaySubCategoryId = requiredPair[0];
                                                                                }
                                                                                else {
                                                                                    message = "Sub Category does not exist"
                                                                                }

                                                                                var sql = `SELECT * FROM ${categoryId} where subCategory ='${subCategoryId}'`;
                                                                                var query = db.query(sql, function (err, categoryList) {
                                                                                    if (err) {
                                                                                        return res.status(500).send(err);
                                                                                    }
                                                                                    else {

                                                                                        if (editId.length > 0) {
                                                                                            editProduct = categoryList.find(val => {
                                                                                                if (val.id == editId) {
                                                                                                    return val
                                                                                                }
                                                                                            })
                                                                                            if (!editProduct) {
                                                                                                editRedirect = true;
                                                                                                message = "Edit Id does not exists";
                                                                                            }
                                                                                        }
                                                                                        var session = req.session.userId;

                                                                                        product_categories.map((val, index) => {
                                                                                            dropdownListCategory.push({
                                                                                                category: val.category,
                                                                                                displayCategory: val.displayCategory
                                                                                            })
                                                                                        })

                                                                                        product_categories.map((val, index) => {

                                                                                            if (dropdownListCategory[index]) {
                                                                                                if (!dropdownListCategoryUpdated.find(value => value.category == val.category)) {
                                                                                                    dropdownListCategoryUpdated.push({
                                                                                                        category: val.category,
                                                                                                        displayCategory: val.displayCategory
                                                                                                    })
                                                                                                }
                                                                                            }
                                                                                        })

                                                                                        res.render('admin', {
                                                                                            message,
                                                                                            productCategoryList,
                                                                                            products: categoryList,
                                                                                            editProduct,
                                                                                            categoryId,
                                                                                            subCategoryId,
                                                                                            displayCategoryId,
                                                                                            displaySubCategoryId,
                                                                                            session,
                                                                                            editRedirect,
                                                                                            categoryRedirect,
                                                                                            brands,
                                                                                            logo,
                                                                                            contact,
                                                                                            career,
                                                                                            faq,
                                                                                            brandsHeader,
                                                                                            landing,
                                                                                            about,
                                                                                            dropdownListCategoryUpdated,
                                                                                            adminUsers,
                                                                                            description
                                                                                        });
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    showCategoryProductsUser: (req, res, next) => {

        var subCategoryId = req.params.subCategoryId;
        var categoryId = req.params.categoryId
        message = ""

        var session = sessionStorage.getItem('username')

        if (session || req.session.userId) {

            var sql = "select * from career_description";
            var query = db.query(sql, function (err, description) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    description = description[0] ? description[0].description : "Currently No Positions"

                    var sql = "select * from brands_header";
                    var query = db.query(sql, function (err, brandsHeader) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            brandsHeader = brandsHeader[0] ? brandsHeader[0].img : "noImage.jpg"

                            var sql = "select * from faq";
                            var query = db.query(sql, function (err, faq) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    faq = faq[0] ? faq[0].img : "noImage.jpg"

                                    var sql = "select * from career";
                                    var query = db.query(sql, function (err, career) {
                                        if (err) {
                                            return res.status(500).send(err);
                                        }
                                        else {
                                            career = career[0] ? career[0].img : "noImage.jpg"


                                            var sql = "select * from contact";
                                            var query = db.query(sql, function (err, contact) {
                                                if (err) {
                                                    return res.status(500).send(err);
                                                }
                                                else {
                                                    contact = contact[0] ? contact[0].img : "noImage.jpg"

                                                    var sql = "select * from home";
                                                    var query = db.query(sql, function (err, home) {
                                                        if (err) {
                                                            return res.status(500).send(err);
                                                        }
                                                        else {
                                                            var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                                                            var landing = home.find(val => val.type == "landing") ? home.find(val => val.type == "landing").img : "noImage.jpg"
                                                            var about = home.find(val => val.type == "about") ? home.find(val => val.type == "about").img : "noImage.jpg"

                                                            var sql = "select * from brands";
                                                            var query = db.query(sql, function (err, brands) {
                                                                if (err) {
                                                                    return res.status(500).send(err);
                                                                }
                                                                else {

                                                                    var productCategoryList = []

                                                                    var sql = 'SELECT * FROM product_categories';
                                                                    var query = db.query(sql, function (err, product_categories) {
                                                                        if (err) {
                                                                            return res.status(500).send(err);
                                                                        }
                                                                        else {

                                                                            var displayCategory = []
                                                                            for (var i in product_categories) {
                                                                                displayCategory.push(product_categories[i].displayCategory)
                                                                                displayCategory = [...new Set(displayCategory)]
                                                                            }

                                                                            var category = []
                                                                            for (var i in product_categories) {
                                                                                category.push(product_categories[i].category)
                                                                                category = [...new Set(category)]
                                                                            }

                                                                            for (var i = 0; i < displayCategory.length; i++) {
                                                                                var catArr = product_categories.filter(val => val.category == category[i])
                                                                                var subCategory = {}

                                                                                catArr.map(val => {
                                                                                    if (val.displaySubCategory.length > 0) {
                                                                                        subCategory[val.displaySubCategory] = val.subCategory
                                                                                    }
                                                                                })

                                                                                productCategoryList.push({
                                                                                    displayName: displayCategory[i],
                                                                                    name: category[i],
                                                                                    subCategory: subCategory
                                                                                })
                                                                            }

                                                                            var activeLinkName = req.originalUrl.split('/')

                                                                            if (subCategoryId) {
                                                                                var sql = `SELECT * FROM ${categoryId} where subCategory = "${subCategoryId}"`;
                                                                                var query = db.query(sql, function (err, subCategoryList) {
                                                                                    if (err) {
                                                                                        return res.status(500).send(err);
                                                                                    }
                                                                                    else {
                                                                                        res.render('products', {
                                                                                            message,
                                                                                            productCategoryList,
                                                                                            products: subCategoryList,
                                                                                            activeLinkName,
                                                                                            logo,
                                                                                            brands,
                                                                                            career,
                                                                                            faq,
                                                                                            brandsHeader,
                                                                                            landing,
                                                                                            about,
                                                                                            session,
                                                                                            description
                                                                                        });
                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                var sql = `SELECT * FROM ${categoryId}`;
                                                                                var query = db.query(sql, function (err, categoryList) {
                                                                                    if (err) {
                                                                                        return res.status(500).send(err);
                                                                                    }
                                                                                    else {
                                                                                        res.render('products', {
                                                                                            message,
                                                                                            productCategoryList,
                                                                                            products: categoryList,
                                                                                            activeLinkName,
                                                                                            brands,
                                                                                            logo,
                                                                                            contact,
                                                                                            career,
                                                                                            faq,
                                                                                            brandsHeader,
                                                                                            landing,
                                                                                            about,
                                                                                            session,
                                                                                            description
                                                                                        });
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    })

                                                                }
                                                            })

                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            res.redirect("/login");
        }
    },


    showEditProduct: (req, res, next) => {

        var editID = req.body.editId
        var categoryId = req.body.categoryId
        var subCategoryId = req.body.subCategoryId

        message = ""

        if (subCategoryId == "") {
            var sql = `select * FROM ${categoryId} WHERE id = ${editID}`;
            var query = db.query(sql, function (err, rows) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    res.redirect(`/admin-category/${categoryId}/${editID}`);
                }
            })
        }
        else {
            var sql = `select * FROM ${categoryId} WHERE id = ${editID}`;
            var query = db.query(sql, function (err, rows) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}/${editID}`);
                }
            })
        }
    },

    deleteProduct: (req, res, next) => {
        var deleteId = req.body.deleteId
        var categoryId = req.body.categoryId
        var subCategoryId = req.body.subCategoryId

        if (subCategoryId === "") {
            var sql = `DELETE FROM ${categoryId} WHERE id = ${deleteId}`;
            var query = db.query(sql, function (err, rows) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    res.redirect(`admin-category/${categoryId}`);
                }
            })
        }
        else {
            var sql = `DELETE FROM ${categoryId} WHERE id = ${deleteId}`;
            var query = db.query(sql, function (err, rows) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    var sql = `DELETE FROM ${categoryId} WHERE id = ${deleteId}`;
                    var query = db.query(sql, function (err, rows) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            res.redirect(`admin-subcategory/${categoryId}/${subCategoryId}`);
                        }
                    })
                }
            })
        }
    },

    deleteSubCategory: (req, res, next) => {

        var categoryId = req.params.categoryId;

        var deleteSubCategory = req.body.deleteSubCategory;

        message = '';

        var sql = `delete from product_categories where subCategory='${deleteSubCategory}';`;
        var query = db.query(sql, function (err, row) {
            if (err) {
                return res.status(500).send(err);
            }
            else {

                var sql = `delete from ${categoryId} where subCategory='${deleteSubCategory}';`;
                var query = db.query(sql, function (err, row) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {

                        res.redirect(`/admin-category/${categoryId}`);
                    }
                });
            }
        });

    },

    addCategoryProduct: (req, res, next) => {
        var editID = req.params.editId
        var categoryId = req.params.categoryId;

        var name = req.body.name.trim()
        var description = req.body.description
        var stockCount = req.body.stockCount.length > 0 ? req.body.stockCount : 0
        var subCategory = req.body.subCategory ? req.body.subCategory.split(',')[0] : ""
        var displaySubCategory = req.body.subCategory ? req.body.subCategory.split(',')[1] : ""

        var img_name = "";

        if (editID) {
            var sql = `UPDATE ${categoryId} SET category="${categoryId}", subCategory="${subCategory}", displaySubCategory="${displaySubCategory}", name="${name}", description="${description}", stockCount=${stockCount} where id=${editID};`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-category/${categoryId}`);
            });
        }
        else {
            var sql = `INSERT INTO ${categoryId} (category, subCategory, displaySubCategory, name, description, stockCount) VALUES ("${categoryId}", "${subCategory}","${displaySubCategory}", "${name}", "${description}", ${stockCount});`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-category/${categoryId}`);
            });
        }
    },

    addSubCategory: (req, res, next) => {

        var categoryId = req.params.categoryId;

        var addSubCategory = req.body.addSubCategory.trim()
        var addSubCategoryHeading = addSubCategory.trim().replace(/&/gi, '_').replace(/ /gi, "").replace(/\//gi, "").replace(/-/gi, "")

        message = '';

        var sql = `select * from product_categories where category="${categoryId}"`;
        var query = db.query(sql, function (err, row) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var sql = `INSERT INTO product_categories (category, displayCategory, subCategory, displaySubCategory) VALUES ('${categoryId}','${row[0].displayCategory}','${addSubCategoryHeading}', '${addSubCategory}')`;
                var query = db.query(sql, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect(`/admin-category/${categoryId}`);
                    }
                });

            }
        });

    },

    addCategory: (req, res, next) => {

        var addCategory = req.body.addCategory.trim()
        var addCategoryHeading = addCategory.trim().replace(/&/gi, '_').replace(/ /gi, "").replace(/\//gi, "").replace(/-/gi, "")

        message = '';

        var sql = `create table ${addCategoryHeading}(id INT NOT NULL AUTO_INCREMENT, category VARCHAR(255) NOT NULL, subCategory VARCHAR(255) NOT NULL, displaySubCategory VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, stockCount FLOAT NOT NULL, creationTimestamp timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, PRIMARY KEY ( id ));`;

        var query = db.query(sql, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var sql = `INSERT INTO product_categories (category, displayCategory, subCategory, displaySubCategory) VALUES ('${addCategoryHeading}','${addCategory}','', '')`;
                var query = db.query(sql, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect(`/admin-category/${addCategoryHeading}`);
                    }
                });
            };
        })
    },

    deleteCategory: (req, res, next) => {

        var deleteCategory = req.body.deleteCategory;

        message = '';

        var sql = `delete from product_categories where category='${deleteCategory}';`;
        var query = db.query(sql, function (err, row) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var sql = `drop table ${deleteCategory};`;
                var query = db.query(sql, function (err, row) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect(`/admin-category/computers`);
                    }
                });
            }
        });

    },

    addSubCategoryProduct: (req, res, next) => {
        var editID = req.params.editId
        var categoryId = req.params.categoryId;
        var subCategoryId = req.params.subCategoryId;
        var displaySubCategoryId = req.body.displaySubCategoryId
        message = '';

        var name = req.body.name.trim()
        var description = req.body.description
        var stockCount = req.body.stockCount.length > 0 ? req.body.stockCount : 0

        if (editID) {
            var sql = `UPDATE ${categoryId} SET category="${categoryId}", subCategory="${subCategoryId}", displaySubCategory = "${displaySubCategoryId}", name="${name}", description="${description}", stockCount=${stockCount} where id=${editID}`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}`);
            });
        }
        else {
            var sql = `INSERT INTO ${categoryId} (category, subCategory, displaySubCategory, name, description, stockCount) VALUES ("${categoryId}", "${subCategoryId}", "${displaySubCategoryId}", "${name}", "${description}", ${stockCount})`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}`);
            });
        }
    },

    addSubCategoryMultiple: (req, res, next) => {
        var categoryId = req.body.categoryId;
        var subCategoryId = req.body.subCategoryId;
        var displaySubCategoryId = req.body.displaySubCategoryId
        var file = req.files.multipleRecord;

        var file_name = file.name;

        file.mv('public/uploads/' + file_name, function (err) {
            var results = []

            fs.createReadStream('public/uploads/' + file.name)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {

                    results.map(val => {
                        var sql = `INSERT INTO ${categoryId} (category, subCategory, displaySubCategory, name, description, stockCount) VALUES ("${categoryId}", "${subCategoryId}", "${displaySubCategoryId}", "${val.name}", "${val.description}", ${val.stockCount})`;
                        var query = db.query(sql, function (err, result) {
                        });
                    })

                    res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}`);
                });
        });

    },

    showForgotPassword: (req, res, next) => {

        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                var message = ""
                res.render('forgotPassword', {
                    message,
                    success: false,
                    logo,
                    session
                });
            }
        })
    },

    postForgotPassword: (req, res, next) => {
        var email = req.body.emailId
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')

                var sql = "select * from login_cred";
                var query = db.query(sql, function (err, rows) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (rows.find(val => val.email === email)) {
                            message = "Password send to your registered Email-id.";
                            res.render('forgotPassword', {
                                message,
                                success: true,
                                session
                            });

                            var messageBody = "\n Hello There, Your password is" + rows.find(val => val.email === email).password
                            mailUtils.sendMail('info@sochglobal.com', "Password Request", messageBody)
                        }
                        else {
                            message = "Email id does not exist.";
                            res.render('forgotPassword', {
                                message,
                                success: false,
                                logo,
                                session
                            });
                        }
                    }
                })
            }
        });
    },
    addBrands: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO brands (img) VALUES ('${img_name}');`;
                var query = db.query(sql, function (err, brands) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect(`/admin-category/computers`);
                    }
                })

            });
        } else {

            var sql = "select * from brands";
            var query = db.query(sql, function (err, brands) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, brands });
                }
            })
        }
    },

    deleteBrands: (req, res, next) => {

        var id = req.body.id;

        var sql = `DELETE FROM brands where id = ${id};`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addLogo: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM home WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update home set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO home (id, img, type)VALUES (${id},'${img_name}','logo')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })
            });
        } else {

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                var logo = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, logo });
                }
            })
        }
    },


    deleteLogo: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM home where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addLanding: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM home WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update home set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO home (id, img, type)VALUES (${id},'${img_name}','landing')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })

            });
        } else {

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                var logo = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, logo });
                }
            })
        }
    },


    deleteLanding: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM home where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addAbout: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM home WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update home set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO home (id, img, type)VALUES (${id},'${img_name}','about')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })

            });
        } else {

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                var logo = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, logo });
                }
            })
        }
    },


    deleteAbout: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM home where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addContact: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM contact WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update contact set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO contact (id, img, type)VALUES (${id},'${img_name}','contact')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })

            });
        } else {

            var sql = "select * from contact";
            var query = db.query(sql, function (err, contact) {
                contact = contact[0] ? contact[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, contact });
                }
            })
        }
    },


    deleteContact: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM contact where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },


    addCareer: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `update career set img ='${img_name}' where id = ${id}`;
                var query = db.query(sql, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect(`/admin-category/computers`);
                    }
                })

            });
        } else {

            var sql = "select * from career";
            var query = db.query(sql, function (err, career) {
                career = career[0] ? career[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, career });
                }
            })
        }
    },


    deleteCareer: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM career where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },


    addFaq: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM faq WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update faq set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO faq (id, img, type)VALUES (${id},'${img_name}','faq')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })
            });
        } else {

            var sql = "select * from faq";
            var query = db.query(sql, function (err, faq) {
                faq = faq[0] ? faq[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, faq });
                }
            })
        }
    },


    deleteFaq: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM faq where type="${type}"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addBrandsHeader: (req, res, next) => {

        var file = req.files.img;
        var img_name = file.name;
        var id = req.body.id;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `SELECT COUNT(*) FROM brands_header WHERE id = ${id}`
                var query = db.query(sql, function (err, check) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (check[0]['COUNT(*)'] && (check[0]['COUNT(*)']).toString() == '1') {
                            var sql = `update brands_header set img ='${img_name}' where id = ${id}`
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                        else {
                            var sql = `INSERT INTO brands_header (id, img, type)VALUES (${id},'${img_name}','brands_header')`;
                            var query = db.query(sql, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    res.redirect(`/admin-category/computers`);
                                }
                            })
                        }
                    }
                })

            });
        } else {

            var sql = "select * from brands_header";
            var query = db.query(sql, function (err, brandsHeader) {
                brandsHeader = brandsHeader[0] ? brandsHeader[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, brandsHeader });
                }
            })
        }
    },

    deleteBrandsHeader: (req, res, next) => {

        var type = req.body.id;

        var sql = `DELETE FROM brands_header where id="1"`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    showRegister: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                var registerMessage = ""
                res.render('register', {
                    logo,
                    session,
                    registerMessage
                });
            }
        })
    },

    showEducation: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                res.render('education', {
                    logo,
                    session,
                });
            }
        })
    },

    showCaution: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')
                res.render('caution', {
                    logo,
                    session
                });
            }
        })
    },

    registerUser: (req, res, next) => {
        var first = req.body.first
        var last = req.body.last
        var email = req.body.email
        var phone = req.body.phone
        var company = req.body.company
        var country = req.body.country
        var password = req.body.password

        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var logo = home.find(val => val.type == "logo") ? home.find(val => val.type == "logo").img : "noImage.jpg"
                var session = sessionStorage.getItem('username')

                var sql = "select * from login_cred";
                var query = db.query(sql, function (err, rows) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        if (rows.find(val => val.email === email)) {
                            var registerMessage = "user already Exist";
                            var message = ""
                            res.render('register', {
                                registerMessage,
                                success: false,
                                session,
                                message,
                                logo
                            });
                        }
                        else {
                            var sql = `INSERT INTO login_cred (first, last, email, phone, company, country, password, type, status)VALUES ('${first}','${last}','${email}','${phone}','${company}','${country}','${password}','user',${0})`;
                            var query = db.query(sql, function (err, rows) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                else {
                                    var registerMessage = "Application Recieved, Please Wait for approval.";
                                    var message = ""
                                    res.render('register', {
                                        registerMessage,
                                        success: true,
                                        logo,
                                        session,
                                        message
                                    });
                                }
                            })
                        }
                    }
                })

            }
        })
    },

    adminUserUpdate: (req, res, next) => {
        var id = req.body.id
        var status = req.body.status

        var sql = `update login_cred set status=${status} where id=${id}`;
        var query = db.query(sql, function (err, rows) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

    addCareerDescription: (req, res, next) => {

        var description = req.body.description;
        var id = req.body.id;

        var sql = `update career_description set description='${description}' where id = ${id}`;
        var query = db.query(sql, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.redirect(`/admin-category/computers`);
            }
        })
    },

}
