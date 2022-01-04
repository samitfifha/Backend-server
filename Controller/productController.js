
Product = require('../Models/product');
// Handle index actions
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var product = new Product();
    product.nameproduct = req.body.nameproduct;
    product.typeproducts = req.body.typeproducts ? req.body.typeproducts : product.typeproducts;
    product.color = req.body.color;
    product.size = req.body.size;
    product.price= req.body.price;
    product.quantity = req.body.quantity;
    product.image = req.file.path;
 
// save the contact and check for errors
product.save()
.then(data => {
    res.json(data);
})
.catch(err => {
    res.json({ message: err});
});
};
// Handle view contact info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
            product.nameproduct = req.body.nameproduct;
        product.typeproducts = req.body.typeproducts ? req.body.typeproducts : product.typeproducts;
    product.product = req.body.color;
    product.size = req.body.size;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    // save the contact and check for errors
    product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'product Info updated',
                data: product
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'product deleted'
        });
    });
};