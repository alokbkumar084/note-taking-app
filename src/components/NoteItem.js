import React from "react";

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg mb-4 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <p>{note.content}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
