import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true); // fetch notes takes time

  // this will run each time user load the home page
  useEffect(() => {
    // toast.success("You should see me")
    const fetchNotes = async () => {
      try {
        // always add the await keyword so that it waits for the request to complete
        const res = await api.get("/notes"); // now prefixed with the base url
        // const res = await fetch("http://localhost:5001/api/notes")
        setNote(res.data);
        // console.log("Before rate limit is set to false")
        setRateLimited(false);
      } catch (err) {
        console.log(err);
        // toast.error("failed to load notes");

        // 429 error code is rate limited code
        if (err.response?.status == 429) {
          setRateLimited(true);
          toast.error("failed to load notes");
        } else {
        }
      } finally {
        // always runs at the end
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      {/* mx-auto rather than using display flex to centre a container horiztonally */}
      <div className="mx-auto max-w-7xl">
        {loading && (
          <div className="text-accent text-center py-10">Loading Notes...</div>
        )}
        {(note.length > 0 && !isRateLimited) ?  
        (
          <div className="ml-3 mr-3 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {note.map((nt) => {
              // pass in the setNote function as a prop to the NoteCard
                return <NoteCard key={nt._id} note={nt} setNotes={setNote}/>
            })}

          </div>
        ) : (
          !isRateLimited && (
            <div className="ml-2 mr-2 mx-auto max-w-7xl bg-base-100 border border-dashed border-primary py-8 px-6 flex flex-col items-center justify-center shadow-md rounded-xl mt-12">
              <h2 className="text-2xl font-bold text-primary mb-2">No Notes Available</h2>
              <p className="text-base text-center max-w-lg mb-4 text-base-content">
                You haven't added any notes yet. Click the <span className="font-semibold text-primary">"New Note"</span> button above to get started and organize your thoughts efficiently.
              </p>
              <div className="text-sm text-neutral-content">Your notes will appear here once created.</div>
            </div>
          )
        )
      }
      </div>
    </div>
  );
};

export default HomePage;
