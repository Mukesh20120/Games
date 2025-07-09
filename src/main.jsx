import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import GameSettings from "./components/games/TicTacToe/GameSetting.jsx";
import TicTacToe from "./components/games/TicTacToe/TicTacToe.jsx";
import Sudoku from "./components/games/Sudoku/Sudoku.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/tictactoe",
        children: [
          { path: "", element: <GameSettings /> },
          { path: "play", element: <TicTacToe /> },
        ],
      },
      {
        path: "/sudoku",
        element: <Sudoku />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
