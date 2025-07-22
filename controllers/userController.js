const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Auth = require('../models/auth');

const postUser = async (req, res) => {
  const decryptPassword = CryptoJs.AES.decrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString(CryptoJs.enc.Utf8);
  // console.log(req.body.password, decryptPassword, process.env.CRYPTO_SECRET_KEY);
  const newUser = new User({ id: Date.now(), ...req.body });
  await newUser.save();
  const newAuth = new Auth({ id: Date.now(), email: req.body.email, password: decryptPassword });
  await newAuth.save();
  res.status(201).json(newUser);
}

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(201).json(users);
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Mongoose auto-converts to ObjectId
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await User.findOneAndUpdate(
      { id: id },
      req.body,
      { new: true } // returns the updated document
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ id: Number(req.params.id) });
    if (result.deletedCount === 1) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Login user
const loginUser = async (req, res) => {
const { email, password } = req.body;
const decryptPassword = CryptoJs.AES.decrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString(CryptoJs.enc.Utf8);

  try {
    const user = await Auth.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== decryptPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const role = user.email === 'sidhantaks@gmail.com' ? 'admin' : 'user';
    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        role: role
      }
      , process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION },
    );
    res.json({ message: 'Login successful', user: { email: user.email, role }, token: token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
    postUser, 
    getUsers,
    getUserById,    
    updateUser,
    deleteUser, 
    loginUser
}