import type { DifficultySelectorProps } from '../types/game';

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onDifficultyChange }) => {
  const difficulties = [
    { value: 'beginner', label: '初級', description: 'ランダムに手を選択' },
    { value: 'intermediate', label: '中級', description: '簡単な戦略あり' },
    { value: 'advanced', label: '上級', description: '高度な思考アルゴリズム' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">難易度設定</h2>
      
      <div className="space-y-3">
        {difficulties.map((diff) => (
          <label key={diff.value} className="flex items-start cursor-pointer">
            <input
              type="radio"
              name="difficulty"
              value={diff.value}
              checked={difficulty === diff.value}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="mt-1 mr-3"
            />
            <div>
              <div className="font-semibold text-gray-800">{diff.label}</div>
              <div className="text-sm text-gray-600">{diff.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;