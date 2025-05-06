const Note = require("../model/Note");
const axios = require("axios");

const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const catApiResponse = await axios.get('https://catfact.ninja/fact');
        const catfact = catApiResponse.data.fact;

        const note = new Note({ title, content, catfact });
        const newNote = await note.save();

        res.status(201).json({
            "message": "new note created successfully",
            "newnote": newNote
        })

    } catch(err) {
        res.status(500).json({
            "message": "falied to create a new note",
            error: err
        })
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({
            "message": "notes fetched successfully",
            "notes": notes
        })
    } catch(err) {
        res.status(500).json({
            "message": "falied to get all notes",
            error: err
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            res.status(400).json({
                "message": "Note not found"
            })
        } else {
            await note.deleteOne();
            res.status(200).json({
                "message": "note deleted"
            })
        }
    } catch(err) {
        res.status(500).json({
            "message": "falied to delete note",
            error: err
        })
    }
}

const findNote = async (req, res) => {
    try {
        const search = req.body.search;
        const notes = await Note.find({
            $or: [
                { "title": { $regex: search, $options: 'i' } },
                { "content": { $regex: search, $options: 'i' } },
                { "catfact": { $regex: search, $options: 'i' } },
            ]
        })
        if(notes.length < 0){
            res.status(200).json({
                "message": "No notes found"
            })
        } else {
            const response = {
                "No. of notes": notes.length,
                notes: notes.map(note => {
                    return {
                        "title": note.title,
                        "content": note.content,
                        "catfact": note.catfact
                    }
                })
            }
            res.status(200).json({
                "message": "notes founded",
                "notes": response
            })
        }
    } catch(err) {
        res.status(500).json({
            "message": "falied to find note",
            error: err
        })
    }
}

module.exports = { createNote, getNotes, deleteNote, findNote };