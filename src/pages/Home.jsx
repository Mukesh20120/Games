import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const games = [
    { name: "Tic Tac Toe", path: "/tictactoe" },
    { name: "Sudoku", path: "/sudoku" },
  ];

   return (
    <div className="flex flex-col w-full items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">🎮 Game Hub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        {games.map((game) => (
          <button
            key={game.path}
            onClick={() => navigate(game.path)}
            className="border border-gray-300 p-8 rounded-lg shadow-md hover:bg-blue-50 transition text-lg font-semibold text-gray-700"
          >
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
