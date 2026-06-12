import React, { useState } from "react";
import { saveToStorage } from "../../utils/storage";
import AddModal from "../AddModal/AddModal";
import "./ItemCard.css";

export default function ItemCard({
  name,
  completed,
  setItems,
  id,
  dateCreated,
  color,
  storageKey,
  clearAllHandler,
  processedItems,
  showModal,
  setShowModal,
  setTitle,
}) {
  let [isCompleted, setIsCompleted] = useState(completed);

  const toggleComplete = () => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      saveToStorage(storageKey, newItems);
      return newItems;
    });
    setIsCompleted(!isCompleted);
  };

  const deleteItem = () => {
    processedItems.length == 1
      ? clearAllHandler()
      : setItems((prevItems) => {
          const newItems = prevItems.filter((item) => item.id !== id);
          saveToStorage(storageKey, newItems);
          return newItems;
        });
  };

  const editItem = () => {
    deleteItem();
    setTitle(name)
    setShowModal(!showModal);
  };

  return (
    <div className={`item-container ${color}`}>
      <div className={`item-header ${isCompleted ? "completed" : ""}`}>
        {name}
      </div>
      <div className="date">{dateCreated}</div>
      <div className="conditional-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          onClick={editItem}
          className="editSvg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="yellow"
            d="M5 21h14c1.1 0 2-.9 2-2v-8h-2v8H5V5h8V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"
          />
          <path
            fill="yellow"
            d="M7 14v2c0 .55.45 1 1 1h2c.27 0 .52-.11.71-.29l7.65-7.65l-3.41-3.41L7.3 13.3a1 1 0 0 0-.29.71Zm13.71-7.29a.996.996 0 0 0 0-1.41l-2-2a.996.996 0 0 0-1.41 0l-1.65 1.65l3.41 3.41z"
          />
        </svg>

        <svg
          onClick={deleteItem}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path
            fill="#e74c3c"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
          />
        </svg>
        {!isCompleted && (
          <svg
            className="checkbox"
            onClick={toggleComplete}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z"
            />
          </svg>
        )}
        {isCompleted && (
          <svg
            className="checkbox"
            onClick={toggleComplete}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m9 11l3 3l8-8" />
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
