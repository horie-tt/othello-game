import { useEffect } from 'react';
import Board from './Board';
import GameInfo from './GameInfo';
import DifficultySelector from './DifficultySelector';
import { useOthelloGame } from '../hooks/useOthelloGame';
import { getAIMove } from '../utils/aiPlayer';

const Game: React.FC = () => {
  const {
    board,
    currentPlayer,
    gameStatus,
    scores,
    difficulty,
    handleCellClick,
    setDifficulty,
    resetGame,
    getValidMoves,
    makeCPUMove
  } = useOthelloGame();

  // CPUのターン処理
  useEffect(() => {
    if (currentPlayer === 'white' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, difficulty);
        if (aiMove) {
          makeCPUMove(aiMove.row, aiMove.col);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus, board, difficulty, makeCPUMove]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          オセロゲーム
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Board 
              board={board}
              currentPlayer={currentPlayer}
              onCellClick={handleCellClick}
            />
          </div>
          
          <div className="space-y-6">
            <GameInfo 
              currentPlayer={currentPlayer}
              scores={scores}
              gameStatus={gameStatus}
            />
            
            <DifficultySelector 
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
            />
            
            <button
              onClick={resetGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              ゲームリセット
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;