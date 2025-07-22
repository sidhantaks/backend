const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/tokenController');

router.post('/', authenticateToken, productController.postProduct); // Create product
router.get('/', authenticateToken, productController.getProducts); // Read all products    
router.get('/:id', authenticateToken, productController.getProductById); // Read one product
router.put('/:id',authenticateToken, productController.updateProduct); // Update product      
router.delete('/:id', authenticateToken, productController.deleteProduct); // Delete product

module.exports = router;