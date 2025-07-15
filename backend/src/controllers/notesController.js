// all the controllers go here, decides what to do when a specific request happens

export const getAllNotes = (req, res)=>{
    res.status(200).send("You just fetched the notes");
}

export const createNewNote = (req, res)=>{
    res.status(200).send("Note created successfully!");
}

export const updateNote =  (req, res)=>{
    res.status(200).send("Note updated successfully!");
}

export const deleteNote = (req, res)=>{
    res.status(200).send("Note deleted successfully!")
}