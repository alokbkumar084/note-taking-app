
import React from "react";

const EmbedNote = ({ note }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default EmbedNote;
