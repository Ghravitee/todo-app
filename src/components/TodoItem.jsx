/* eslint-disable react/prop-types */
import { useDrag, useDrop } from "react-dnd";
import iconDelete from "../images/icon-cross.svg";
import iconCheck from "../images/icon-check.svg";

const ItemType = "TODO_ITEM";

const TodoItem = ({ todo, index, moveTodo, toggleTodo, deleteTodo, theme }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index; // Update the dragged item index
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={`flex justify-between items-center cursor-pointer ${
        theme === "light" ? "bg-white" : "bg-Very-Dark-Desaturated-Blue"
      } ${todo.completed ? "line-through" : ""} px-4 ${
        todo.completed
          ? `josefin-400 ${
              theme === "light"
                ? "text-Very-Dark-Grayish-Blue-Light/50"
                : "text-Dark-Grayish-Blue-Dark"
            } text-Light-Grayish-Blue-Light`
          : `josefin-700 ${
              theme === "light"
                ? "text-Very-Dark-Grayish-Blue-Light"
                : "text-Light-Grayish-Blue-Dark"
            }`
      } border-b ${
        theme === "light"
          ? "border-b-Light-Grayish-Blue-Light"
          : "border-b-Very-Dark-Grayish-Blue-Dark-2"
      } py-4 text-sm lg:text-base`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div
        className="flex items-center justify-center gap-4"
        onClick={() => toggleTodo(index)}
      >
        {todo.completed ? (
          <div
            className="flex justify-center items-center rounded-full p-1"
            style={{
              backgroundImage: "linear-gradient(to right, #57ddff, #c058f3)",
            }}
          >
            <img
              src={iconCheck}
              alt="icon check"
              className="w-[10px] h-[10px] hover:cursor-pointer"
            />
          </div>
        ) : (
          <div
            className={`relative h-5 w-5 rounded-full cursor-pointer hover:bg-gradient-to-tr from-[#57ddff] to-[#c058f3] p-[1px]`}
          >
            <div
              className={`h-full w-full rounded-full border-2 ${
                theme === "light"
                  ? "border-Light-Grayish-Blue-Light"
                  : "border-Very-Dark-Grayish-Blue-Dark-1"
              } bg-white hover:bg-white`}
            />
          </div>
        )}
        {todo.text}
      </div>
      <img
        src={iconDelete}
        className="w-4 h-4 hover:cursor-pointer"
        alt="icon for deleting"
        onClick={() => deleteTodo(index)}
      />
    </li>
  );
};

export default TodoItem;
