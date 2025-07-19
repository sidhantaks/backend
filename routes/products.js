const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.postProduct); // Create product
router.get('/', productController.getProducts); // Read all products    
router.get('/:id', productController.getProductById); // Read one product
router.put('/:id', productController.updateProduct); // Update product      
router.delete('/:id', productController.deleteProduct); // Delete product

module.exports = router;