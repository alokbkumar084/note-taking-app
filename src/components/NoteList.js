import React, { useState, useEffect } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import SearchIcon from "../assets/images/search.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend-ten-alpha-76.vercel.app/api/notes"
      );
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const addNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setFilteredNotes((prevFiltered) => [newNote, ...prevFiltered]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleEditClick = (note) => {
    console.log("noter", note);
    setId(note.id);
    setIsEditing(true);
    setCurrentNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
  };

  const handleSaveEdit = async () => {
    const updatedNotes = notes.map((note) =>
      note.id === currentNote.id
        ? { ...note, title: newTitle, content: newContent }
        : note
    );

    try {
      const response = await axios.put(
        "https://backend-ten-alpha-76.vercel.app/api/notes",
        { id: id, title: newTitle, content: newContent }
      );

      if (response.status == 200 || 201) {
        toast.success("Note updated successfully!");
        setIsEditing(false);
        fetchData();
        return;
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to update note. Please try again!");
    }
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    setIsEditing(false);
    setCurrentNote(null);
    setNewTitle("");
    setNewContent("");
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://backend-ten-alpha-76.vercel.app/api/notes?id=${id}`
      );
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      toast.success("Note deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete note. Please try again!");
    }
  };

  return (
    <>
      <AddNote onAddNote={addNote} fetchData={fetchData} />

      <div className="p-4 w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search notes..."
            className="w-full pl-4 pr-10 py-2 border mb-4 rounded-lg dark:shadow-lg dark:bg-gray-700 dark:border-gray-700"
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            className=" absolute w-5 h-5 right-4 top-2"
          />
        </div>

        {isEditing && (
          <div className="mb-4">
            <h2 className="mb-2">Edit Note</h2>
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="py-2 px-4 border mb-2 w-full rounded-lg dark:shadow-lg dark:bg-gray-700 dark:border-gray-700"
                placeholder="Edit Title"
              />
            </div>
            <div>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="py-2 px-4 border mb-4 w-full rounded-lg dark:shadow-lg dark:bg-gray-700 dark:border-gray-700"
                placeholder="Edit Content"
              />
            </div>
            <button
              onClick={handleSaveEdit}
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="overflow-y-auto max-h-96">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={() => handleEditClick(note)}
                onDelete={deleteNote}
              />
            ))
          ) : (
            <p>No notes found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteList;

