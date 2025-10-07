// all the controllers go here, decides what to do when a specific request happens
import Note from "../model/Note.js";

export const getSpecificNote = async (req, res) => {
  // res.status(200).send("You just fetched the notes");
  try {
    const userId = req.userId;
    const note = await Note.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getSpecificNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// req is not used at all so we add an underscore as a placeholder
export const getAllNotes = async (req, res) => {
  // res.status(200).send("You just fetched the notes");
  const userId = req.userId;
  try {
    // const notes = await Note.find().sort({ createdAt: -1 });
    // newest note comes first
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNewNote = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.userId; // This comes from the verifyToken middleware

    const newNote = new Note({
      title: title,
      content: desc,
      user: userId, // Link the note to the authenticated user
    });
    const savedNote = await newNote.save();
    res.status(201).json({ message: savedNote });
  } catch (err) {
    console.log("Error is createNewNote controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    // first figure out what is being changed
    const { title, desc } = req.body;
    // we say req.params.id since in the noteRoutes
    // the route for updating notes is defined as
    // api/notes/:id where :id ("id") is the parameter
    // second argument is passing in the updated data for the
    // note
    const userId = req.userId;

    // interesting thing to note - title should be undefined as in the
    // api call I am only sending the desc field, yet the call still
    // goes through and that specific note updates
    // const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title: title, content: desc}, {new: true})
    // setting new to true gives me the note after the update is applied
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // Find by ID and user
      { title: title, content: desc },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found!" });
    }
    res.status(200).json({ updatedNote });
  } catch (err) {
    console.log("Error in updateNote controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    // an alternate way to do this is to use Note.findByIdAndDelete

    const userId = req.userId;
    const noteToDelete = await Note.deleteOne({
      _id: req.params.id,
      user: userId,
    });
    // const {title, desc} = req.body;
    // const noteToDelete = await Note.deleteOne({ _id: req.params.id });
    if (noteToDelete.deletedCount === 0) {
      res.status(404).json({ message: "Could not find note to delete" });
    }
    res
      .status(200)
      .json({ noteToDelete, message: "Deleted the following note" });
  } catch (err) {
    console.log("Error in updateNote controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
