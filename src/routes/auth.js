import express from 'express';
import AuthController from '../controllers/AuthController';

const {
  login,
} = AuthController;

const authRoute = express();

authRoute.post('/login', login);

export default authRoute;
