import { useState, useEffect } from "react";
import bgMobileLight from "./images/bg-mobile-light.jpg";
import bgMobileDark from "./images/bg-mobile-dark.jpg";
import bgDesktopLight from "./images/bg-desktop-light.jpg";
import bgDesktopDark from "./images/bg-desktop-dark.jpg";
import iconSun from "./images/icon-sun.svg";
import iconMoon from "./images/icon-moon.svg";
import TodoItem from "./components/TodoItem";

// import ThemeProvider from "./components/ThemeProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  // Load todos from localStorage if available, otherwise start with an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // Add 'light' or 'dark' class to body
    localStorage.setItem("theme", theme); // Save the theme in localStorage
  }, [theme]);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // function to add items to the todo list
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  // function to add todo using the enter key

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // function to toggle completed and active todo
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // function to delete todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // function to reset todo
  const clearTodo = () => {
    setTodos([]);
  };

  // function to check for the active todos

  const remainingTodos = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  // function to filter todo based on all todos, active todos, and completed todos
  const getFilteredTodos = () => {
    if (activeTab === "Active") {
      return todos.filter((todo) => !todo.completed);
    } else if (activeTab === "Completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  // function to Move Todo when dragged
  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`${
          theme === "light" ? "bg-white" : "bg-Very-Dark-Blue"
        } h-screen`}
      >
        <div className="max-w-full relative">
          <img
            src={theme === "light" ? bgMobileLight : bgMobileDark}
            alt=""
            className="w-full md:hidden max-h-[18rem] block"
          />
          <img
            src={theme === "light" ? bgDesktopLight : bgDesktopDark}
            alt=""
            className="w-full hidden md:block lg:max-h-[15rem]"
          />
          <div className="max-w-[20rem] md:max-w-[33rem] absolute top-10 lg:top-10 left-0 right-0 mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl josephin-700 tracking-[0.4em] font-semibold">
              TODO
            </h1>
            <img
              onClick={toggleTheme}
              src={theme === "light" ? iconMoon : iconSun}
              className="cursor-pointer"
            />
          </div>

          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-Very-Dark-Desaturated-Blue"
            } absolute bottom-[25%] md:bottom-[15%] lg:bottom-[30%] max-w-[20rem] md:max-w-[33rem] left-0 right-0 mx-auto w-full rounded-[4px] p-4 flex items-center gap-3`}
          >
            <div
              className={`w-5 h-5 rounded-full border ${
                theme === "light"
                  ? "border-Light-Grayish-Blue-Light"
                  : "border-Very-Dark-Grayish-Blue-Dark-1"
              } hover:cursor-pointer`}
            />
            <input
              type="text"
              placeholder="Create a todo.."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`outline-none ${
                theme === "light"
                  ? "text-Dark-Grayish-Blue-Light bg-white"
                  : "text-Light-Grayish-Blue-Dark bg-Very-Dark-Desaturated-Blue"
              }   josephin-4 w-full`}
            />
          </div>
        </div>

        <div className="max-w-[20rem] md:max-w-[33rem] mx-auto rounded-[4px] bg-white -translate-y-8 md:-translate-y-4 lg:-translate-y-10 box">
          <ul>
            {getFilteredTodos().map((todo, index) => (
              <TodoItem
                theme={theme}
                key={index}
                todo={todo}
                index={index}
                moveTodo={moveTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
            {todos.length >= 1 && (
              <div
                className={`p-4 flex justify-between items-center ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-Very-Dark-Desaturated-Blue"
                }`}
              >
                <p className="text-sm text-Dark-Grayish-Blue-Light josefin-400">
                  {remainingTodos()} items left
                </p>
                <div className="hidden md:flex gap-3">
                  {["All", "Active", "Completed"].map((tabTitle) => (
                    <p
                      key={tabTitle}
                      onClick={() => setActiveTab(tabTitle)}
                      className={`cursor-pointer josefin-700 ${
                        activeTab === tabTitle
                          ? "text-Bright-Blue"
                          : "text-Dark-Grayish-Blue-Light"
                      } ${
                        theme === "light"
                          ? "hover:text-Very-Dark-Grayish-Blue-Light"
                          : "hover:text-white"
                      }`}
                    >
                      {tabTitle}
                    </p>
                  ))}
                </div>
                <p
                  className={`text-sm text-Dark-Grayish-Blue-Light cursor-pointer ${
                    theme === "light"
                      ? "hover:text-Very-Dark-Grayish-Blue-Light"
                      : "hover:text-white"
                  } josefin-400`}
                  onClick={clearTodo}
                >
                  Clear completed
                </p>
              </div>
            )}
          </ul>
        </div>

        {todos.length >= 1 && (
          <div className="md:hidden flex py-3 px-3 justify-center items-center gap-4 rounded-md box max-w-[20rem] md:max-w-[33rem] mx-auto josefin-700">
            {["All", "Active", "Completed"].map((tabTitle) => (
              <p
                key={tabTitle}
                onClick={() => setActiveTab(tabTitle)}
                className={`cursor-pointer ${
                  activeTab === tabTitle
                    ? "text-Bright-Blue"
                    : "text-Dark-Grayish-Blue-Light"
                }`}
              >
                {tabTitle}
              </p>
            ))}
          </div>
        )}

        <p className="text-Dark-Grayish-Blue-Light josefin-400 flex justify-center my-12 md:my-4">
          Drag and drop to reorder list
        </p>
      </main>
    </DndProvider>
  );
};

export default App;
