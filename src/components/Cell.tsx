import type { CellProps } from '../types/game';

const Cell: React.FC<CellProps> = ({ value, row, col, onClick, isValidMove, isPlayerTurn }) => {
  const getCellContent = () => {
    if (value === 'black') {
      return (
        <div className="relative w-9 h-9 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-xl border-3 border-gray-800">
          <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold opacity-80">●</span>
          </div>
        </div>
      );
    }
    if (value === 'white') {
      return (
        <div className="relative w-9 h-9 bg-gradient-to-br from-gray-100 to-white rounded-full shadow-xl border-3 border-gray-400">
          <div className="absolute top-1 left-1 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-600 text-xs font-bold">○</span>
          </div>
        </div>
      );
    }
    
    // 有効な手を表示
    if (isValidMove && isPlayerTurn) {
      return (
        <div className="w-7 h-7 bg-gray-700 bg-opacity-40 rounded-full border-2 border-gray-800 border-dashed flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-600 rounded-full opacity-50"></div>
        </div>
      );
    }
    
    return null;
  };

  const getCellClass = () => {
    let baseClass = "aspect-square bg-green-500 border border-green-700 flex items-center justify-center transition-colors";
    
    if (isValidMove && isPlayerTurn) {
      baseClass += " cursor-pointer hover:bg-green-400";
    } else if (!value) {
      baseClass += " cursor-not-allowed";
    }
    
    return baseClass;
  };

  return (
    <div
      className={getCellClass()}
      onClick={isValidMove && isPlayerTurn ? onClick : undefined}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;