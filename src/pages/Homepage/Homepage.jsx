import { useState, useEffect } from "react";
import bgMobileLight from "../../images/bg-mobile-light.jpg";

import bgMobileDark from "../../images/bg-mobile-dark.jpg";
import bgDesktopLight from "../../images/bg-desktop-light.jpg";
import bgDesktopDark from "../../images/bg-desktop-dark.jpg";
import iconSun from "../../images/icon-sun.svg";
import iconMoon from "../../images/icon-moon.svg";
import TodoItem from "../../components/TodoItem";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "../../../firebase";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Homepage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/Signin");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error, "An error occred");
      });
  };

  useEffect(() => {
    document.body.className = theme; // Add 'light' or 'dark' class to body
    localStorage.setItem("theme", theme); // Save the theme in localStorage
  }, [theme]);

  useEffect(() => {
    const fetchTodos = async () => {
      // Ensure that the user is logged in
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid; // Get the user ID
          const todosCollection = collection(db, "users", uid, "todos"); // Fetch the user's todos
          const todoSnapshot = await getDocs(todosCollection);
          const todoList = todoSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todoList);
        } else {
          console.log("User is logged out");
        }
      });
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim()) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid; // Get user ID
          const newTodo = { text: input, completed: false };
          const docRef = await addDoc(
            collection(db, "users", uid, "todos"),
            newTodo
          ); // Add todo to user's collection
          setTodos([...todos, { ...newTodo, id: docRef.id }]);
          setInput("");
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const toggleTodo = async (index) => {
    const todo = todos[index];
    const updatedTodo = { ...todo, completed: !todo.completed };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        await updateDoc(doc(db, "users", uid, "todos", todo.id), updatedTodo); // Update in the user's todo collection
        setTodos(todos.map((t, i) => (i === index ? updatedTodo : t)));
      }
    });
  };

  const deleteTodo = async (index) => {
    const todo = todos[index];

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        await deleteDoc(doc(db, "users", uid, "todos", todo.id)); // Delete from user's todo collection
        setTodos(todos.filter((_, i) => i !== index));
      }
    });
  };

  const clearTodo = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        for (let todo of completedTodos) {
          await deleteDoc(doc(db, "users", uid, "todos", todo.id)); // Delete from the user's todo collection
        }
        setTodos(todos.filter((todo) => !todo.completed));
      }
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
            alt="background image of the web app"
            className="w-full md:hidden max-h-[18rem] block"
          />
          <img
            src={theme === "light" ? bgDesktopLight : bgDesktopDark}
            alt="background image of the web app"
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
              alt="icons used to change from light to dark mode"
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

        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-Dark-Grayish-Blue-Light josefin-400 flex justify-center my-12 md:my-4">
            Drag and drop to reorder list
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-Very-Dark-Desaturated-Blue flex justify-center items-center text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </main>
    </DndProvider>
  );
};

export default Homepage;
