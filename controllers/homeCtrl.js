var mysql = require('mysql')
var mailUtils = require('./../utils/mail-utils')

var message = '';
module.exports = {

    showLogin: (req, res, next) => {
        var sql = "select * from home";
        var query = db.query(sql, function (err, home) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                home = home[0] ? home[0].img : "noImage.jpg"

                var message = ""
                res.render('login', {
                    message,
                    home
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
                var landing = home[1] ? home[1].img : "noImage.jpg"
                var about = home[2] ? home[2].img : "noImage.jpg"
                home = home[0] ? home[0].img : "noImage.jpg"
                res.render('index', { home, landing, about });
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
                        home = home[0] ? home[0].img : "noImage.jpg"

                        res.render('contact', {
                            message,
                            home,
                            contact
                        });

                    }
                })
            }
        })
    },

    showCareer: (req, res, next) => {

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
                        home = home[0] ? home[0].img : "noImage.jpg"
                        res.render('career', { home, career });
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
                        home = home[0] ? home[0].img : "noImage.jpg"
                        res.render('faq', { home, faq });
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
                home = home[0] ? home[0].img : "noImage.jpg"
                res.render('notFound', { home });
            }
        })
    },

    submitNewsLetter: (req, res, next) => {
        var email = req.body.emailId

        var messageBodyForCompany = "User Email-id for Subscription: " + email
        var messageBodyForUser = "Thanks for subscribe to SochGlobal. You will now get latest udates."

        mailUtils.sendMail('info@sochglobal.com', "Enquiry Mail", messageBodyForCompany)
        mailUtils.sendMail(email, "Congratulations", messageBodyForUser)

        res.redirect('/');
    },

    showBrands: (req, res, next) => {

        var sql = "select * from brandsHeader";
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
                        home = home[0] ? home[0].img : "noImage.jpg"

                        var sql = "select * from brands";
                        var query = db.query(sql, function (err, brands) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                res.render('brands', {
                                    brands,
                                    home,
                                    brandsHeader
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

        var sql = "select * from login_cred";
        var query = db.query(sql, function (err, rows) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                if (rows[0].email === email && rows[0].password === password) {
                    req.session.userId = rows[0].id;
                    res.redirect('admin-category/computers');
                }
                else {
                    message = "Login Credentials are wrong";
                    res.render('login', {
                        message,
                    });
                }
            }
        })
    },

    logout: (req, res, next) => {
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

        var sql = "select * from brandsHeader";
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
                                                var landing = home[1] ? home[1].img : "noImage.jpg"
                                                var about = home[2] ? home[2].img : "noImage.jpg"
                                                home = home[0] ? home[0].img : "noImage.jpg"

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
                                                                                home,
                                                                                contact,
                                                                                career,
                                                                                faq,
                                                                                brandsHeader,
                                                                                landing,
                                                                                about
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
                                                                        home,
                                                                        contact,
                                                                        career,
                                                                        faq,
                                                                        brandsHeader,
                                                                        landing,
                                                                        about
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
        message = ""

        var sql = "select * from brandsHeader";
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
                                                var landing = home[1] ? home[1].img : "noImage.jpg"
                                                var about = home[2] ? home[2].img : "noImage.jpg"
                                                home = home[0] ? home[0].img : "noImage.jpg"

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
                                                                            home,
                                                                            contact,
                                                                            career,
                                                                            faq,
                                                                            brandsHeader,
                                                                            landing,
                                                                            about
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
    },

    showCategoryProductsUser: (req, res, next) => {

        var subCategoryId = req.params.subCategoryId;
        var categoryId = req.params.categoryId
        message = ""

        var sql = "select * from brandsHeader";
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
                                                var landing = home[1] ? home[1].img : "noImage.jpg"
                                                var about = home[2] ? home[2].img : "noImage.jpg"
                                                home = home[0] ? home[0].img : "noImage.jpg"

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
                                                                                home,
                                                                                brands,
                                                                                career,
                                                                                faq,
                                                                                brandsHeader,
                                                                                landing,
                                                                                about
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
                                                                                home,
                                                                                contact,
                                                                                career,
                                                                                faq,
                                                                                brandsHeader,
                                                                                landing,
                                                                                about
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
                res.redirect(`/admin-category/${categoryId}`);
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
            var sql = `UPDATE ${categoryId} SET category="${categoryId}", subCategory="${subCategory}", displaySubCategory="${displaySubCategory}", name="${name}", img="${img_name}", description="${description}", stockCount=${stockCount} where id=${editID};`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-category/${categoryId}`);
            });
        }
        else {
            var sql = `INSERT INTO ${categoryId} (category, subCategory, displaySubCategory, name, img, description, stockCount) VALUES ("${categoryId}", "${subCategory}","${displaySubCategory}", "${name}", "${img_name}", "${description}", ${stockCount});`;
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

    addSubCategoryProduct: (req, res, next) => {
        var editID = req.params.editId
        var categoryId = req.params.categoryId;
        var subCategoryId = req.params.subCategoryId;
        var displaySubCategoryId = req.body.displaySubCategoryId
        message = '';

        var name = req.body.name.trim()
        var description = req.body.description
        var stockCount = req.body.stockCount.length > 0 ? req.body.stockCount : 0

        var img_name = "";

        if (editID) {
            var sql = `UPDATE ${categoryId} SET category="${categoryId}", subCategory="${subCategoryId}", displaySubCategory = "${displaySubCategoryId}", img="${img_name}", name="${name}", description="${description}", stockCount=${stockCount} where id=${editID}`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}`);
            });
        }
        else {
            var sql = `INSERT INTO ${categoryId} (category, subCategory, displaySubCategory, img, name, description, stockCount) VALUES ("${categoryId}", "${subCategoryId}", "${displaySubCategoryId}", "${img_name}", "${name}", "${description}", ${stockCount})`;
            var query = db.query(sql, function (err, result) {
                res.redirect(`/admin-subCategory/${categoryId}/${subCategoryId}`);
            });
        }
    },

    showForgotPassword: (req, res, next) => {
        var message = ""
        res.render('forgotPassword', {
            message,
            success: false
        });
    },

    postForgotPassword: (req, res, next) => {
        var email = req.body.emailId

        var sql = "select * from login_cred";
        var query = db.query(sql, function (err, rows) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                if (rows[0].email === email) {
                    message = "Password send to your registered Email-id.";

                    res.render('forgotPassword', {
                        message,
                        success: true
                    });

                    var messageBody = "\n Hello There, Your password is" + rows[0].password
                    mailUtils.sendMail('info@sochglobal.com', "Password Request", messageBody)
                }
                else {
                    message = "Email id does not exist.";
                    res.render('forgotPassword', {
                        message,
                        success: false
                    });
                }
            }
        })
    },

    postContact: (req, res, next) => {
        var name = req.body.name
        var email = req.body.emailId
        var subject = req.body.subject
        var message = req.body.message

        var messageBody = "\n Name : " + name + "\n Email-id : " + email + "\n subject : " + subject + "\n Message : " + message

        mailUtils.sendMail('info@sochglobal.com', "Enquiry Mail", messageBody)
        message = "Message send successfully. Please wait we will contact you soon."
        res.render('contact', {
            message
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO home (img, type) VALUES ('${img_name}', 'logo');`;
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

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                home = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, home });
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO home (img, type) VALUES ('${img_name}', 'landing');`;
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

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                home = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, home });
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO home (img, type) VALUES ('${img_name}', 'about');`;
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

            var sql = "select * from home";
            var query = db.query(sql, function (err, home) {
                home = home[0] ? home[0].img : "noImage.jpg"
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                    res.render('admin', { message: message, home });
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO contact (img, type) VALUES ('${img_name}', 'contact');`;
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO career (img, type) VALUES ('${img_name}', 'career');`;
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO faq (img, type) VALUES ('${img_name}', 'faq');`;
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

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/uploads/' + file.name, function (err) {

                var sql = `INSERT INTO brandsHeader (img, type) VALUES ('${img_name}', "brands");`;
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

            var sql = "select * from brandsHeader";
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

        var sql = `DELETE FROM brandsHeader where type="${type}"`;
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
