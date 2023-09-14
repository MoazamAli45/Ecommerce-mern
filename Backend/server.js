const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE;
const DB =
  "mongodb+srv://moazamali:gekNTxispBRebAHT@cluster0.kfm1qmn.mongodb.net/?retryWrites=true&w=majority";
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
    console.log("DB CONNECTION ERROR!");
    console.log(err);
  });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running on port 8000...");
});
