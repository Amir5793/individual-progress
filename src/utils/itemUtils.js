export function resetItemsByTimePeriod(items) {
  const nowDate = new Date();
  return items.map((item) => {
    const copy = { ...item };
    if (
      copy.dateHandler !== nowDate.getDay() &&
      copy.timePeriod === "Daily"
    ) {
      copy.completed = false;
      copy.daysPassed = nowDate.getDay() - copy.dateHandler;
      copy.dateHandler = nowDate.getDay();
    }
    if (
      copy.daysPassed / copy.weeksPassed / 7 === 1 &&
      copy.timePeriod === "Weekly"
    ) {
      copy.completed = false;
      copy.weeksPassed++;
    }
    if (
      copy.daysPassed / copy.monthsPassed / 30 === 1 &&
      copy.timePeriod === "Monthly"
    ) {
      copy.completed = false;
      copy.monthsPassed++;
    }
    return copy;
  });
}

export function countItems(items, timePeriod) {
  let completed = 0;
  let total = 0;
  items.forEach((item) => {
    if (item.timePeriod === timePeriod) {
      total++;
      if (item.completed) completed++;
    }
  });
  return { completed, total };
}

export function createItem(existingItems, value, color, timePeriod) {
  const nowDate = new Date();
  return {
    id: existingItems.length,
    value,
    color,
    completed: false,
    timePeriod,
    dateCreated: `Created at: ${nowDate.getFullYear()}/${nowDate.getMonth()}/${nowDate.getDay()}`,
    dateHandler: nowDate.getDate(),
    daysPassed: 0,
    weeksPassed: 1,
    monthsPassed: 1,
  };
}
