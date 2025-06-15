import type { BoardProps } from '../types/game';
import Cell from './Cell';
import { isValidMove } from '../utils/gameLogic';

const Board: React.FC<BoardProps> = ({ board, currentPlayer, onCellClick }) => {
  return (
    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-8 gap-1 aspect-square max-w-lg mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isValidMove={isValidMove(board, rowIndex, colIndex, currentPlayer)}
              isPlayerTurn={currentPlayer === 'black'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;