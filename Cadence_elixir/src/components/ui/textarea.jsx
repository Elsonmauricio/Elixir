import React from "react";

/**
 * Textarea UI component para uso consistente em formulários.
 * Props: id, name, value, onChange, placeholder, className, rows, etc.
 */
export default function Textarea({ id, name, value, onChange, placeholder, className = "", rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-base resize-y ${className}`}
      {...props}
    />
  );
}
