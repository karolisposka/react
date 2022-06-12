const express = require("express");
const mysql = require("mysql2/promise");
const { mysqlConfig } = require("../../config");
const router = express.Router();

router.get("/services", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(`SELECT * from services`);
    await con.end();

    if (data.length > 0) {
      return res.send(data);
    }
    return res.status(500).status({ msg: "no data" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "something wrong with the server. Please try again later" });
  }
});

router.post("/addServices", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] =
      await con.execute(`INSERT INTO services (title, description, price)
    VALUES(${mysql.escape(req.body.title)}, ${mysql.escape(
        req.body.description
      )}, ${mysql.escape(req.body.price)})`);
    await con.end();
    if (!data.insertId) {
      return res.status(500).send({
        msg: "something wrong with the server. Please try again later",
      });
    }
    return res.send({ msg: `token ${data.insertId} ` });
  } catch (err) {
    return res.status(500).send({
      msg: "something wrong with the server.Please try again later",
    });
  }
});

module.exports = router;
