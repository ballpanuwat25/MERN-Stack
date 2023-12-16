import express from 'express';

import { getProducts, getProductById, createProduct, deleteProductById, updateProductById } from '../model/products';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();

        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const product = await getProductById(id);

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createNewProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { prod_name, prod_desc } = req.body;

        if(!prod_name || !prod_desc) {
            return res.sendStatus(400);
        }

        const product = await createProduct({ prod_name, prod_desc });

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedProduct = await deleteProductById(id);

        return res.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { prod_name, prod_desc } = req.body;

        if(!prod_name || !prod_desc) {
            return res.sendStatus(400);
        }

        const product = await getProductById(id);

        product.prod_name = prod_name;
        product.prod_desc = prod_desc;
        await product.save();

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};