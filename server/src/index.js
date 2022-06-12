const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const servicesRouter = require("./routes/v1/Products");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({ msg: "server is running" });
})
app.use("/v1/products", servicesRouter);

app.listen(port, () => {
  return console.log("server is running");
});
