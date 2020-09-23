import React from "react";

export default function ListItem({
  name,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragDrop,
  onDragEnd,
  index
}) {
  return (
    <label
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDragDrop}
      onDragEnd={onDragEnd}
      htmlFor={`task-list-${index}`}
      className="list-item"
    >
      <input id={`task-list-${index}`} type="checkbox" className="checkbox" />
      {name}
    </label>
  );
}
