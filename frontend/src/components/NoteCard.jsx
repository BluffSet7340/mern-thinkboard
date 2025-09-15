import React from "react";
import { Link } from "react-router";
import { Trash2, SquarePen } from "lucide-react";
import { createDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";


const NoteCard = ({ note, setNotes }) => {
    // every component will have it own delete function so it should be placed
    // inside
    const handleDelete = async (e, note_id) => {
        e.preventDefault(); // prevents navigation to view note in detail pages
        
        // exit out of function if users says no
        if(!window.confirm("Are you sure you want to delete this note?")) return;
    
        try {
            // console.log(note_id)
            await api.delete(`/notes/${note_id}`)
            // here was filter out the deleted note
            setNotes((prev)=>prev.filter(note=> note._id !== note_id)) //get rid of
            // deleted notes
            toast.success("Note successfully deleted")
            // window.location.reload(); // reloads the webpage so that UI is updated 
        } catch (error) {
            toast.error("Delete was unsuccessful")
            console.log(error)
        }
    }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card border-t-[4px] hover:shadow-lg transition-all duration-200 border-secondary rounded-md bg-primary text-black"
    >
      <div className="card-body">
        <h3 className="card-title font-bold line-clamp-1">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="font-bold text-sm text-base-content/60">{createDate(note.updatedAt)}</span>
          <div className="flex item-center gap-6">
            <button>
              <SquarePen className="size-5" />
            </button>
            <button onClick={(e)=>handleDelete(e, note._id)}>
              <Trash2 className="size-5 " />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
