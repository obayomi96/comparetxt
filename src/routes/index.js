import express from 'express';
import authRoute from './auth';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'A REST API based application that the assistant can use to compare submissions for similarity',
  })
);

router.use('/', authRoute);

export default router;
