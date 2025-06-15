import type { Board, Player, Position } from '../types/game';

// オセロゲームの基本ロジック

// 初期ボード状態を作成
export const createInitialBoard = (): Board => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  // 初期配置
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  return board;
};

// 8方向の探索用
const directions: [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

// 指定位置に石を置けるかチェック
export const isValidMove = (board: Board, row: number, col: number, player: Player): boolean => {
  // 既に石がある場合は無効
  if (board[row][col] !== null) {
    return false;
  }

  const opponent = player === 'black' ? 'white' : 'black';

  // 8方向をチェック
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    let hasOpponentBetween = false;

    // 境界内かつ相手の石がある限り進む
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opponent) {
      hasOpponentBetween = true;
      r += dr;
      c += dc;
    }

    // 相手の石を挟んで自分の石があれば有効
    if (hasOpponentBetween && 
        r >= 0 && r < 8 && c >= 0 && c < 8 && 
        board[r][c] === player) {
      return true;
    }
  }

  return false;
};

// 有効な手をすべて取得
export const getValidMoves = (board: Board, player: Player): Position[] => {
  const validMoves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push({ row, col });
      }
    }
  }
  return validMoves;
};

// 石を置いてボードを更新
export const makeMove = (board: Board, row: number, col: number, player: Player): Board => {
  if (!isValidMove(board, row, col, player)) {
    return board;
  }

  const newBoard = board.map(row => [...row]);
  const opponent = player === 'black' ? 'white' : 'black';

  // 石を置く
  newBoard[row][col] = player;

  // 8方向をチェックして石をひっくり返す
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    const toFlip = [];

    // 相手の石を記録
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && newBoard[r][c] === opponent) {
      toFlip.push([r, c]);
      r += dr;
      c += dc;
    }

    // 自分の石で挟んでいる場合、ひっくり返す
    if (toFlip.length > 0 && 
        r >= 0 && r < 8 && c >= 0 && c < 8 && 
        newBoard[r][c] === player) {
      toFlip.forEach(([flipR, flipC]) => {
        newBoard[flipR][flipC] = player;
      });
    }
  }

  return newBoard;
};

// スコアを計算
export const calculateScore = (board: Board): { black: number; white: number } => {
  let black = 0;
  let white = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === 'black') {
        black++;
      } else if (board[row][col] === 'white') {
        white++;
      }
    }
  }

  return { black, white };
};

// ゲーム終了判定
export const isGameOver = (board: Board): boolean => {
  const blackMoves = getValidMoves(board, 'black');
  const whiteMoves = getValidMoves(board, 'white');
  
  // 両プレイヤーとも打てる手がない、またはボードが満杯
  return blackMoves.length === 0 && whiteMoves.length === 0;
};

// 勝者を判定
export const getWinner = (board: Board): Player | 'draw' => {
  const scores = calculateScore(board);
  
  if (scores.black > scores.white) {
    return 'black';
  } else if (scores.white > scores.black) {
    return 'white';
  } else {
    return 'draw';
  }
};