import { router } from "./routes";

const express = require("express")

const app = express();
const port = 3000

app.use('/api/v1', router)

  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
      
  