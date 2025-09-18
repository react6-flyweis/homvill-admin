import React, { useState } from "react";

const phoneRegex = /^[0-9]{6,15}$/;

const NewChatDialog = ({ open, onClose, onCreate }) => {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!contact.trim() || !phoneRegex.test(contact.trim())) {
      setError("Please enter a valid contact number (digits only, 6-15 chars)");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    onCreate({ contact: contact.trim(), name: name.trim() });
    setContact("");
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">New Chat..?</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Enter following details continue chat
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-red-700 mb-2">
            Enter Contact Number
          </label>
          <input
            type="number"
            className="w-full bg-gray-200 rounded px-3 py-3 mb-4 text-gray-700"
            placeholder="Enter Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            inputMode="numeric"
          />

          <label className="block text-sm font-medium text-red-700 mb-2">
            Enter Name
          </label>
          <input
            className="w-full bg-gray-200 rounded px-3 py-3 mb-4 text-gray-700"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded shadow-md"
            >
              Start Chat Now...!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatDialog;
