// api-routes.js
// Initialize express router
let router = require('express').Router();
const  jwt = require('jsonwebtoken');
const auth = require("../Controller/auth");
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
      destination(req,file, cb){
          cb(null,'uploads/')
      },
      filename(req,file,cb){
          cb(null,`${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
      }
  })
  const fileFilter = (req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype ===  'image/jpg'){
              cb(null,true);
        }else{
              cb(null,false);
        }
  }
  const upload = multer({storage: storage,fileFilter: fileFilter
      })
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
router.route('/panier')
    .post(userController.panier)
    router.route('/panier')
    .patch(userController.deleteP)
router.route('/login')
    .post(userController.login)
router.route('/users')
    .get(auth,userController.index)
    .post(upload.single('image'),userController.new);
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