const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running on port 8000...");
});
