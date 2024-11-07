// components/AddNote.js
import React, { useState } from "react";

const AddNote = ({ onAddNote }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Toggle the form visibility
  const handleAddClick = () => setIsAdding(!isAdding);

  // Handle form submission
  const handleSave = () => {
    if (title && content) {
      // Call the onAddNote function passed from NoteList
      onAddNote({
        id: Date.now().toString(), // Generate a unique ID
        title,
        content,
      });
      // Reset the form fields and close the form
      setTitle("");
      setContent("");
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-4 w-[75%]">
      {/* Add Note Button */}
      <button
        onClick={handleAddClick}
        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 flex ml-auto"
      >
        {isAdding ? "Cancel" : "Add Note"}
      </button>

      {/* Add Note Form (only visible when adding) */}
      {isAdding && (
        <div className="mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border mb-2 rounded-lg dark:shadow-lg dark:bg-gray-700 dark:border-gray-700"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border mb-2 rounded-lg dark:shadow-lg dark:bg-gray-700 dark:border-gray-700"
          />
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 "
          >
            Save Note
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNote;
