const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

const router = express.Router();
const events = () => getDB().collection("events");

router.post("/", async (req, res) => {
  const event = req.body;
  await events().insertOne(event);
  res.json({ message: "Event created", event });
});


router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const list = await events()
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json(list);
});

router.get("/:id", async (req, res) => {
  const event = await events().findOne({
    _id: new ObjectId(req.params.id)
  });

  res.json(event);
});


router.put("/:id", async (req, res) => {
  await events().updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({ message: "Event updated" });
});


router.delete("/:id", async (req, res) => {
  await events().deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.json({ message: "Event deleted" });
});

module.exports = router;
