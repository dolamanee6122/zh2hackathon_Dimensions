const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require("config");
//BodyParser middleware
app.use(express.json());
var cors = require("cors");
app.use(cors());
//DB config
const db = config.get("mongoURI");
console.log("db", db);

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

app.use("/api/shop", require("./routes/api/shop"));
//app.use("/", require("./routes/auth"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/merchants", require("./routes/api/merchants"));
app.use("/api/buyers", require("./routes/api/buyers"));
app.use("/api/transaction", require("./routes/api/transaction"));
app.use("/api/request", require("./routes/api/request"));

//serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
