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
              <div 
                className="relative w-7 h-7 rounded-full shadow-lg border-2 border-gray-600 mr-2"
                style={{
                  background: '#1f2937',
                  backgroundImage: 'radial-gradient(circle at 30% 30%, #4b5563, #1f2937, #000000)'
                }}
              >
                <div className="absolute top-0.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
              </div>
              <span className="font-semibold">あなた</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{scores.black}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div 
                className="relative w-7 h-7 rounded-full shadow-lg border-2 border-gray-400 mr-2"
                style={{
                  background: '#ffffff',
                  backgroundImage: 'radial-gradient(circle at 30% 30%, #ffffff, #f3f4f6, #e5e7eb)'
                }}
              >
                <div className="absolute top-0.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
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