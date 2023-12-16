import express from 'express';
import jwt from 'jsonwebtoken';
import { get, merge } from 'lodash';

import { getUserById } from '../model/users';

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
        const token = req.cookies['sessionToken-AUTH'];

        if (!token) {
            return res.sendStatus(403);
        }

        jwt.verify(token, 'ef32ea7a4d29caaabcdcfb2754873caff5e76b7ec2054f84ee07543e432e2bf0', async (err: Error, decoded: any) => {
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
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};