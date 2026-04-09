const express = require("express");
const env = require("dotenv").config();
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

// All imported route to be here 






app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
