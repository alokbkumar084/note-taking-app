import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNote = ({ onAddNote, fetchData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddClick = async () => {
    setIsAdding(!isAdding);
  };

  const handleSave = async () => {
    if (title && content) {
      try {
        const response = await axios.post(
          "https://backend-ten-alpha-76.vercel.app/api/notes",
          {
            title: title,
            content: content,
          }
        );

        if (response.status == 200 || 201) {
          toast.success("Note added successfully!");
          setTitle("");
          setContent("");
          setIsAdding(!isAdding);
          fetchData();
          return;
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to add note. Please try again!");
      }

      setTitle("");
      setContent("");
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-4 w-[75%]">
      <button
        onClick={handleAddClick}
        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 flex ml-auto"
      >
        {isAdding ? "Cancel" : "Add Note"}
      </button>

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
