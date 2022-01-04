
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
User = require('../Models/user');
Produit = require('../Models/product')



//update pic 
exports.pic = async (req, res) => {
  User.findById(req.params.user_id, function (err, user) {
          if (err)
              res.send(err);
          user.image = req.file.path
  // save the contact and check for errors
          user.save(function (err) {
              if (err)
                  res.json(err);
              res.json({
                  message: 'photo updated successfully',
                  data: user
              });
          });
      });
  };




// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
exports.new = async (req, res)=> {
    try {
    // Get user input
    const { firstname, lastname, email, password, phone, adress, role} = req.body;

    // Validate user input
    if (!(firstname && lastname && email && password && phone && adress)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
        firstname,
        lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phone,
      adress,
      role,
      image: req.file.path

    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

};


// login 
exports.login = async (req, res)=> {
    // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

};

// Handle view contact info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'user details loading..',
            data: user
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    //user.password = req.body.password;
    user.phone = req.body.phone;
    user.adress = req.body.adress;
	user.role = req.body.role;
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};

//////ajout panier
exports.panier =  async (req, res) => {
  
  User.findById(req.body.userId, function (err, user) {
          if (err)
              res.send(err);
      productId = req.body.productId;
      
  // save the contact and check for errors
          Produit.findById(productId, function(error, product){
            if (product != null){
              user.panier.push(productId);
            }
            user.save(function(err){
              if (err)
                res.json(err);
              res.json({
                message: 'Product successfully added to cart'
              })
            })

          });
      });
  };

/// supprimer un produit du panier
  exports.deleteP =  async (req, res) => {
  
    User.findById(req.body.userId, function (err, user) {
            if (err)
                res.send(err);
        productId = req.body.productId;
        
    // save the contact and check for errors
            Produit.findById(productId, function(error, product){
              for(let i = 0; i< user.panier.length; i++){
                if(user.panier[i] == product){
                  user.panier[i] = null;
                  break;
                }
              }
              user.save(function(err){
                if (err)
                  res.json(err);
                res.json({
                  message: 'Product successfully removed from cart',
                  data: user
                })
              })
  
            
        });
    });

  }

  exports.getPanier = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.status(201).json(user.panier);
    });
};
  

  exports.viewP = function (req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(err);
        res.status(201).json(user);
    });
};



  










