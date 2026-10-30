require("dotenv").config();
const app = require("./src/app");

const connectToDb = require("./src/config/database");

connectToDb();

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
