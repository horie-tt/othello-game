import type { CellProps } from '../types/game';

const Cell: React.FC<CellProps> = ({ value, row, col, onClick, isValidMove, isPlayerTurn }) => {
  const getCellContent = () => {
    if (value === 'black') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 黒石 - マス目より8px小さく */}
          <div 
            className="relative w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full shadow-2xl border-2 border-gray-600"
            style={{
              background: '#1f2937',
              backgroundImage: 'radial-gradient(circle at 30% 30%, #4b5563, #1f2937, #000000)'
            }}
          >
            {/* 光沢効果 */}
            <div className="absolute top-1 left-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-20"></div>
          </div>
        </div>
      );
    }
    if (value === 'white') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 白石 - マス目より8px小さく */}
          <div 
            className="relative w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full shadow-2xl border-2 border-gray-400"
            style={{
              background: '#ffffff',
              backgroundImage: 'radial-gradient(circle at 30% 30%, #ffffff, #f3f4f6, #e5e7eb)'
            }}
          >
            {/* 光沢効果 */}
            <div className="absolute top-1 left-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-80"></div>
          </div>
        </div>
      );
    }
    
    // 有効な手を表示
    if (isValidMove && isPlayerTurn) {
      return (
        <div className="w-full h-full bg-sky-200 bg-opacity-60 flex items-center justify-center">
          <div className="w-3 h-3 bg-sky-400 rounded-full opacity-70"></div>
        </div>
      );
    }
    
    return null;
  };

  const getCellClass = () => {
    let baseClass = "aspect-square bg-green-500 border border-green-700 flex items-center justify-center transition-colors";
    
    if (isValidMove && isPlayerTurn) {
      baseClass += " cursor-pointer";
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