const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

const router = express.Router();

// helper: events collection
const events = () => getDB().collection("events");


// ✅ CREATE EVENT
// POST /api/v3/app/events
router.post("/", async (req, res) => {
  const event = req.body;
  await events().insertOne(event);
  res.json({ message: "Event created", event });
});


// ✅ GET ALL EVENTS (pagination)
// GET /api/v3/app/events?page=1&limit=5
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


// ✅ GET EVENT BY ID
// GET /api/v3/app/events/:id
router.get("/:id", async (req, res) => {
  const event = await events().findOne({
    _id: new ObjectId(req.params.id)
  });

  res.json(event);
});


// ✅ UPDATE EVENT
// PUT /api/v3/app/events/:id
router.put("/:id", async (req, res) => {
  await events().updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({ message: "Event updated" });
});


// ✅ DELETE EVENT
// DELETE /api/v3/app/events/:id
router.delete("/:id", async (req, res) => {
  await events().deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.json({ message: "Event deleted" });
});

module.exports = router;
