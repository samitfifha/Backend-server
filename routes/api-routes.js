// api-routes.js
// Initialize express router
let router = require('express').Router();
const  jwt = require('jsonwebtoken');
const auth = require("../Controller/auth");
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome !',
    });
});
// Import contact controller
var userController = require('../Controller/userController');
// Contact routes
router.route('/login')
    .post(userController.login)
router.route('/users')
    .get(auth,userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

    var productController = require('../Controller/productController');
    // Contact routes
    router.route('/products')
        .get(productController.index)
        .post(productController.new);
    router.route('/products/:product_id')
        .get(productController.view)
        .patch(productController.update)
        .put(productController.update)
        .delete(productController.delete);
// Export API routes

module.exports = router;