const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const user = require("./routes/users");
const lead = require("./routes/leads");
const corsOptions = {
  origin: "http://localhost:3000",
};
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { options, swaggerDefinition } = require("./swagger.js");
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", user);
app.use("/api/v1/lead", lead);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test" });
});

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
