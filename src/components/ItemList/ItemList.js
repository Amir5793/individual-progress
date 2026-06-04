import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import ProgressBar from "../ProgressBar/ProgressBar";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { resetItemsByTimePeriod, countItems } from "../../utils/itemUtils";
import "./ItemList.css";

export default function ItemList({
  showModal,
  storageKey,
  parentItems,
  setParentItems,
}) {
  const [items, setItems] = useState(loadFromStorage(storageKey));

  const displayItems =
    parentItems && parentItems.length > 0 ? parentItems : items;

  useEffect(() => {
    if (parentItems && parentItems.length > 0) {
      setItems(parentItems);
    }
  }, [parentItems]);

  const processedItems = resetItemsByTimePeriod(displayItems);

  let [timePeriod, setTimePeriod] = useState("Daily");

  const { completed: completedCount, total: totalCount } = countItems(
    processedItems,
    timePeriod,
  );

  const timePeriodHandler = (e) => {
    const periods = document.querySelectorAll(".item-time-period");
    periods.forEach((p) => p.classList.remove("period-active"));
    e.target.classList.add("period-active");
    setTimePeriod(e.target.textContent);
  };

  const clearAllHandler = () => {
    if (setParentItems) {
      setParentItems([]);
    } else {
      saveToStorage(storageKey, []);
      setItems([]);
    }
  };

  const activeSetItems = setParentItems || setItems;

  return (
    <div className="main-container">
      {!showModal && (
        <div>
          <div className="item-list-container">
            <div className="item-list-periods">
              <h3
                className="item-time-period period-active"
                onClick={timePeriodHandler}
              >
                Daily
              </h3>
              <h3 className="item-time-period" onClick={timePeriodHandler}>
                Weekly
              </h3>
              <h3 className="item-time-period" onClick={timePeriodHandler}>
                Monthly
              </h3>
            </div>
            {processedItems.map(
              (item) =>
                !item.completed &&
                item.timePeriod === timePeriod && (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.value}
                    color={item.color}
                    completed={item.completed}
                    dateCreated={item.dateCreated}
                    setItems={activeSetItems}
                    storageKey={storageKey}
                  />
                ),
            )}
            <br className="divider" />
            {processedItems.map(
              (item) =>
                item.completed &&
                item.timePeriod === timePeriod && (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.value}
                    color={item.color}
                    completed={item.completed}
                    dateCreated={item.dateCreated}
                    setItems={activeSetItems}
                    storageKey={storageKey}
                  />
                ),
            )}
          </div>
          <ProgressBar
            completedValuesLength={completedCount}
            valuesLength={totalCount}
          />
          <div className="clear-all" onClick={clearAllHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#e74c3c"
                d="M16 16h2c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1m0-8h5c.55 0 1 .45 1 1s-.45 1-1 1h-5c-.55 0-1-.45-1-1s.45-1 1-1m0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1M3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3zM13 5h-2l-.71-.71c-.18-.18-.44-.29-.7-.29H6.41c-.26 0-.52.11-.7.29L5 5H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
