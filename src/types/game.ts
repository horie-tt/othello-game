// ゲームの型定義

export type Player = 'black' | 'white';
export type CellValue = Player | null;
export type Board = CellValue[][];
export type GameStatus = 'playing' | 'finished';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  scores: {
    black: number;
    white: number;
  };
  validMoves: Position[];
  difficulty: Difficulty;
}

export interface GameAction {
  type: string;
  payload?: any;
}

// コンポーネントのプロパティ型
export interface CellProps {
  value: CellValue;
  row: number;
  col: number;
  onClick: () => void;
  isValidMove: boolean;
  isPlayerTurn: boolean;
}

export interface BoardProps {
  board: Board;
  currentPlayer: Player;
  onCellClick: (row: number, col: number) => void;
}

export interface GameInfoProps {
  currentPlayer: Player;
  scores: {
    black: number;
    white: number;
  };
  gameStatus: GameStatus;
}

export interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}