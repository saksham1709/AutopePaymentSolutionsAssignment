const express = require("express");
const router = express.Router();
const { createNote, getNotes, deleteNote, findNote } = require("../controller/noteController");

// create a new note
router.post("/newnote", createNote);

// get all notes
router.get("/", getNotes);

// delete a note
router.delete("/:id", deleteNote);

// search a note
router.post("/search", findNote);


module.exports = router;