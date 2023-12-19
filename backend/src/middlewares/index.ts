import express from 'express';
import jwt from 'jsonwebtoken';
import { get, merge } from 'lodash';

import { getUserById } from '../model/users';

import dotenv from 'dotenv';
dotenv.config();

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const authToken = authHeader && authHeader.split(' ')[1];

        const cookieToken = req.cookies['sessionToken-AUTH'];

        if (!authToken && !cookieToken) {
            return res.sendStatus(401);
        }

        if (authToken) {
            jwt.verify(authToken, process.env.JWT_SECRET, async (err: Error, decoded: any) => {
                if (err) {
                    return res.sendStatus(403);
                }

                const userId = decoded.userId;
                const existingUser = await getUserById(userId);

                if (!existingUser) {
                    return res.sendStatus(403);
                }

                merge(req, { identity: existingUser });

                return next();
            });
        } else if (cookieToken) {
            jwt.verify(cookieToken, process.env.JWT_SECRET, async (err: Error, decoded: any) => {
                if (err) {
                    return res.sendStatus(403);
                }

                const userId = decoded.userId;
                const existingUser = await getUserById(userId);

                if (!existingUser) {
                    return res.sendStatus(403);
                }

                merge(req, { identity: existingUser });

                return next();
            });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
