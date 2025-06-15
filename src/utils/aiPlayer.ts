import type { Board, Position, Difficulty } from '../types/game';
import { getValidMoves, makeMove, calculateScore } from './gameLogic';

// 初級AI：ランダムに手を選択
export const getBeginnerMove = (board: Board): Position | null => {
  const validMoves = getValidMoves(board, 'white');
  if (validMoves.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * validMoves.length);
  return validMoves[randomIndex];
};

// 中級AI：簡単な評価関数を使用
export const getIntermediateMove = (board: Board): Position | null => {
  const validMoves = getValidMoves(board, 'white');
  if (validMoves.length === 0) return null;

  let bestMove = validMoves[0];
  let bestScore = -1;

  // 各手を評価
  for (const move of validMoves) {
    const newBoard = makeMove(board, move.row, move.col, 'white');
    const score = evaluatePosition(newBoard, move);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

// 上級AI：ミニマックス法を使用
export const getAdvancedMove = (board: Board, depth: number = 4): Position | null => {
  const validMoves = getValidMoves(board, 'white');
  if (validMoves.length === 0) return null;

  let bestMove = validMoves[0];
  let bestScore = -Infinity;

  for (const move of validMoves) {
    const newBoard = makeMove(board, move.row, move.col, 'white');
    const score = minimax(newBoard, depth - 1, false, -Infinity, Infinity);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

// 位置の評価関数（中級AI用）
const evaluatePosition = (board: Board, move: Position): number => {
  const scores = calculateScore(board);
  let score = scores.white - scores.black;

  // 角の重要性を高く評価
  const corners = [[0,0], [0,7], [7,0], [7,7]];
  for (const [r, c] of corners) {
    if (r === move.row && c === move.col) {
      score += 100;
    }
  }

  // 辺の評価
  if (move.row === 0 || move.row === 7 || move.col === 0 || move.col === 7) {
    score += 10;
  }

  // 角の隣接マス（悪い手）にペナルティ
  const badPositions = [
    [0,1], [1,0], [1,1], // 左上角隣接
    [0,6], [1,6], [1,7], // 右上角隣接
    [6,0], [6,1], [7,1], // 左下角隣接
    [6,6], [6,7], [7,6], // 右下角隣接
  ];
  
  for (const [r, c] of badPositions) {
    if (r === move.row && c === move.col) {
      // 対応する角が空の場合のみペナルティ
      const cornerR = r < 4 ? 0 : 7;
      const cornerC = c < 4 ? 0 : 7;
      if (board[cornerR][cornerC] === null) {
        score -= 50;
      }
    }
  }

  return score;
};

// ミニマックス法（上級AI用）
const minimax = (board: Board, depth: number, isMaximizing: boolean, alpha: number, beta: number): number => {
  if (depth === 0) {
    return evaluateBoard(board);
  }

  const currentPlayer = isMaximizing ? 'white' : 'black';
  const validMoves = getValidMoves(board, currentPlayer);

  if (validMoves.length === 0) {
    return evaluateBoard(board);
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of validMoves) {
      const newBoard = makeMove(board, move.row, move.col, currentPlayer);
      const score = minimax(newBoard, depth - 1, false, alpha, beta);
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break; // Alpha-Beta pruning
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of validMoves) {
      const newBoard = makeMove(board, move.row, move.col, currentPlayer);
      const score = minimax(newBoard, depth - 1, true, alpha, beta);
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break; // Alpha-Beta pruning
    }
    return minScore;
  }
};

// ボードの評価関数（上級AI用）
const evaluateBoard = (board: Board): number => {
  const scores = calculateScore(board);
  let score = scores.white - scores.black;

  // 位置による重み付け
  const positionWeights = [
    [100, -20, 10, 5, 5, 10, -20, 100],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [10, -2, -1, -1, -1, -1, -2, 10],
    [5, -2, -1, -1, -1, -1, -2, 5],
    [5, -2, -1, -1, -1, -1, -2, 5],
    [10, -2, -1, -1, -1, -1, -2, 10],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [100, -20, 10, 5, 5, 10, -20, 100]
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === 'white') {
        score += positionWeights[row][col];
      } else if (board[row][col] === 'black') {
        score -= positionWeights[row][col];
      }
    }
  }

  return score;
};

// 難易度に応じてAIの手を取得
export const getAIMove = (board: Board, difficulty: Difficulty): Position | null => {
  switch (difficulty) {
    case 'beginner':
      return getBeginnerMove(board);
    case 'intermediate':
      return getIntermediateMove(board);
    case 'advanced':
      return getAdvancedMove(board);
    default:
      return getBeginnerMove(board);
  }
};