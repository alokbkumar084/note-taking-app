
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const AddNote = ({ onAddNote, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
  };

  const handleSave = async () => {
    if (title && content) {
      try {
        const response = await axios.post(
          "https://backend-ten-alpha-76.vercel.app/api/notes",
          { title, content }
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("Note added successfully!");
          setTitle("");
          setContent("");
          setIsModalOpen(false);
          fetchData();
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add note. Please try again!");
      }
    } else {
      toast.error("Title and content cannot be empty!");
    }
  };

  return (
    <div className="mb-4 w-[75%]">
      <button
        onClick={handleAddClick}
        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 flex ml-auto"
      >
        Add Note
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add Note
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNote;
