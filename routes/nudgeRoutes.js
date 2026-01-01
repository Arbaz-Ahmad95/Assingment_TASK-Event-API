const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

const router = express.Router();

const nudges = () => getDB().collection("nudges");


router.post("/", async (req, res) => {
  const nudge = {
    ...req.body,
    createdAt: new Date()
  };

  await nudges().insertOne(nudge);
  res.json({ message: "Nudge created", nudge });
});


router.get("/", async (req, res) => {
  const data = await nudges().find().toArray();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid nudge id" });
  }

  const nudge = await nudges().findOne({ _id: new ObjectId(id) });
  res.json(nudge);
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid nudge id" });
  }

  await nudges().updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );

  res.json({ message: "Nudge updated" });
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid nudge id" });
  }

  await nudges().deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Nudge deleted" });
});

module.exports = router;
