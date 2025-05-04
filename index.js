const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");

const cors = require("cors");
dotenv.config();

const port = 8000;
const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: ['https://tutam9sbd-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
