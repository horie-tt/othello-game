import type { GameInfoProps, Player } from '../types/game';

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, scores, gameStatus }) => {
  const getPlayerName = (player: Player) => {
    return player === 'black' ? '黒' : '白';
  };

  const getStatusMessage = () => {
    if (gameStatus === 'playing') {
      if (currentPlayer === 'black') {
        return 'あなたの番です';
      } else {
        return 'CPUが考えています...';
      }
    }
    if (gameStatus === 'finished') {
      if (scores.black > scores.white) {
        return '🎉 あなたの勝利！';
      } else if (scores.white > scores.black) {
        return '💻 CPUの勝利！';
      } else {
        return '🤝 引き分け！';
      }
    }
    return '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">ゲーム情報</h2>
      
      <div className="space-y-4">
        <div className="text-lg font-semibold text-center p-3 bg-gray-100 rounded">
          {getStatusMessage()}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-7 h-7 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-lg border-2 border-gray-800 mr-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">●</span>
                </div>
              </div>
              <span className="font-semibold">あなた</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{scores.black}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-7 h-7 bg-gradient-to-br from-gray-100 to-white rounded-full shadow-lg border-2 border-gray-400 mr-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 text-xs font-bold">○</span>
                </div>
              </div>
              <span className="font-semibold">CPU</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{scores.white}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;