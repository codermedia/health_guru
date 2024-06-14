require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const port = 3000;

app.use(cors());

app.use("/articles", require("./routes/articles"));
app.use("/recipes", require("./routes/recipes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
