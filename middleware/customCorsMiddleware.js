// customCorsMiddleware.js

import cors from "cors";

const customCorsMiddleware = (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000']; // Adjust as needed
  const options = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  cors(options)(req, res, next);
};

export default customCorsMiddleware;
