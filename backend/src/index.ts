import { router } from "./routes";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://form-ai-rosy.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

const port = 3000

app.use('/api/v1', router)

  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
      
  