import express from 'express';

import { getAllProducts, getProduct, createNewProduct, updateProduct, deleteProduct } from '../controllers/products';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/products', isAuthenticated, getAllProducts);
    router.get('/products/:id', isAuthenticated, getProduct);
    router.post('/products', isAuthenticated, createNewProduct);
    router.patch('/products/:id', isAuthenticated, updateProduct);
    router.delete('/products/:id', isAuthenticated, deleteProduct);
};