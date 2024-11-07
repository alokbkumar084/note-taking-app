import React, { useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import SearchIcon from "../assets/images/search.svg"

const NoteList = () => {
  const initialNotes = [
    {
      id: "1",
      title: "First Note",
      content: "This is the content of the first note.",
    },
    {
      id: "2",
      title: "Second Note",
      content: "This is the content of the second note.",
    },
    {
      id: "3",
      title: "Third Note",
      content: "Content for the third note goes here.",
    },
    {
      id: "4",
      title: "Fourth Note",
      content: "Content of the fourth note is here.",
    },
    {
      id: "5",
      title: "Fifth Note",
      content: "This is the content for the fifth note.",
    },
  ];

  const [notes, setNotes] = useState(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false); // Track if we're in editing mode
  const [currentNote, setCurrentNote] = useState(null); // Track the note being edited
  const [newTitle, setNewTitle] = useState(""); // Track the new title while editing
  const [newContent, setNewContent] = useState(""); // Track the new content while editing

  // Handle adding a new note
  const addNote = (newNote) => {
    setNotes([newNote, ...notes]); // Add the new note to the beginning of the notes array
    setFilteredNotes([newNote, ...filteredNotes]); // Update filtered notes
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter notes based on the search query (case-insensitive)
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  // Function to handle edit button click
  const handleEditClick = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
  };

  // Handle saving the edited note
  const handleSaveEdit = () => {
    // Update the note in the notes array
    const updatedNotes = notes.map((note) =>
      note.id === currentNote.id
        ? { ...note, title: newTitle, content: newContent }
        : note
    );
    setNotes(updatedNotes);
    setIsEditing(false);
    setCurrentNote(null);
    setNewTitle("");
    setNewContent("");
  };

  // Handle deleting a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  return (
    <>
      {/* Add Note Component */}
      <AddNote onAddNote={addNote} />

      <div className="p-4 w-full">
        {/* Search Input */}
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
        {/* Edit Form (only visible when editing) */}
        {isEditing && (
          <div className="mb-4">
            <h2>Edit Note</h2>
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="p-2 border mb-2 w-full"
                placeholder="Edit Title"
              />
            </div>
            <div>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="p-2 border mb-4 w-full"
                placeholder="Edit Content"
              />
            </div>
            <button
              onClick={handleSaveEdit}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Display filtered notes */}
        {/* {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={handleEditClick} />
          ))
        ) : (
          <p>No notes found</p>
        )} */}

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={handleEditClick}
              onDelete={deleteNote}
            />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </>
  );
};

export default NoteList;
