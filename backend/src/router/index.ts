import express from 'express';

import authentication from './authentication';
import products from './products';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    products(router);
    
    return router;
};