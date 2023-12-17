import express from 'express';
import jwt from 'jsonwebtoken';

import { getUserByUsername, createUser } from '../model/users';
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {

        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByUsername(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const sessionToken = jwt.sign({ userId: user._id.toString() }, 'ef32ea7a4d29caaabcdcfb2754873caff5e76b7ec2054f84ee07543e432e2bf0', { expiresIn: '1h' });
        user.authentication.sessionToken = sessionToken;

        await user.save();

        res.cookie('sessionToken-AUTH', sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const logout = (req: express.Request, res: express.Response) => {
    try {
      // Clear the sessionToken in the database or perform any other necessary cleanup
  
      // Clear the sessionToken cookie on the client side
      res.clearCookie('sessionToken-AUTH', { domain: 'localhost', path: '/' });
  
      return res.sendStatus(200);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };