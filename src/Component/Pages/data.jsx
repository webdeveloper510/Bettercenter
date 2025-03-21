import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

const ItemType = "TAB";

const Tab = ({ tab, index, moveTab, removeTab }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`tab ${isDragging ? "dragging" : ""}`}
    >
      {tab.name}
      <span className="close" onClick={() => removeTab(tab.id)}>
        ✖
      </span>
    </div>
  );
};

const Data = () => {
  const [tabs, setTabs] = useState([
    { id: uuidv4(), name: "Tab 1" },
    { id: uuidv4(), name: "Tab 2" },
  ]);

  const moveTab = (fromIndex, toIndex) => {
    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(fromIndex, 1);
    updatedTabs.splice(toIndex, 0, movedTab);
    setTabs(updatedTabs);
  };

  const addTab = () => {
    setTabs([...tabs, { id: uuidv4(), name: `Tab ${tabs.length + 1}` }]);
  };

  const removeTab = (id) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="toolbar">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <Tab key={tab.id} tab={tab} index={index} moveTab={moveTab} removeTab={removeTab} />
          ))}
        </div>
        <button className="add-tab" onClick={addTab}>+</button>
      </div>
    </DndProvider>
  );
};

export default Data;
