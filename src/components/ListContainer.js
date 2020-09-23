import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

export default function ListContainer() {
  const [itemData, setItemData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);

  useEffect(() => {
    fetch("https://demo0242938.mockable.io/todo")
      .then((res) => res.json())
      .then((res) => setItemData(res))
      .then(() => {
        let mySelect = document.getElementById("select-project");
        mySelect.selectedIndex = -1;
      });
  }, []);

  const handleChange = (e) => {
    let index = e.currentTarget.selectedOptions[0].dataset.index;
    setTasks(itemData["Project"][index]["Tasks"]);
  };

  function dragStart(e) {
    e.target.style.opacity = "0.4";
    setDraggedElement(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  }

  function dragEnter(e) {
    e.target.classList.add("over");
  }

  function dragLeave(e) {
    e.stopPropagation();
    e.target.classList.remove("over");
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function dragDrop(e) {
    draggedElement.innerHTML = e.target.innerHTML;
    e.target.innerHTML = e.dataTransfer.getData("text/html");
    return false;
  }

  function dragEnd(e) {
    let listItens = document.querySelectorAll(".list-item");
    [].forEach.call(listItens, function (item) {
      item.classList.remove("over");
    });
    e.target.style.opacity = "1";
  }

  return (
    <div>
      {itemData && (
        <div>
          <div className="dropdown">
            <div className="project-title">Select Project:</div>
            <select onChange={handleChange} id="select-project">
              {itemData["Project"].map((item, index) => (
                <option key={index} data-index={index}>
                  {item["Name"]}
                </option>
              ))}
            </select>
          </div>
          {tasks && (
            <div className="list">
              {tasks.map((task, index) => (
                <ListItem
                  key={task}
                  name={task}
                  onDragStart={dragStart}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDragOver={dragOver}
                  onDragDrop={dragDrop}
                  onDragEnd={dragEnd}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
