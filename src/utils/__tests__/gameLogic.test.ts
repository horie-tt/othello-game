import { describe, it, expect } from 'vitest';
import {
  createInitialBoard,
  isValidMove,
  getValidMoves,
  makeMove,
  calculateScore,
  isGameOver,
  getWinner
} from '../gameLogic';
import type { Board } from '../../types/game';

describe('gameLogic', () => {
  describe('createInitialBoard', () => {
    it('creates an 8x8 board with initial pieces', () => {
      const board = createInitialBoard();
      
      expect(board).toHaveLength(8);
      expect(board[0]).toHaveLength(8);
      
      // 初期配置の確認
      expect(board[3][3]).toBe('white');
      expect(board[3][4]).toBe('black');
      expect(board[4][3]).toBe('black');
      expect(board[4][4]).toBe('white');
      
      // その他のマスは空
      expect(board[0][0]).toBeNull();
      expect(board[7][7]).toBeNull();
    });
  });

  describe('isValidMove', () => {
    it('returns true for valid moves on initial board', () => {
      const board = createInitialBoard();
      
      // 黒の有効な手
      expect(isValidMove(board, 2, 3, 'black')).toBe(true);
      expect(isValidMove(board, 3, 2, 'black')).toBe(true);
      expect(isValidMove(board, 4, 5, 'black')).toBe(true);
      expect(isValidMove(board, 5, 4, 'black')).toBe(true);
    });

    it('returns false for invalid moves', () => {
      const board = createInitialBoard();
      
      // 既に石がある場所
      expect(isValidMove(board, 3, 3, 'black')).toBe(false);
      expect(isValidMove(board, 3, 4, 'black')).toBe(false);
      
      // 挟めない場所
      expect(isValidMove(board, 0, 0, 'black')).toBe(false);
      expect(isValidMove(board, 7, 7, 'black')).toBe(false);
    });
  });

  describe('getValidMoves', () => {
    it('returns all valid moves for a player', () => {
      const board = createInitialBoard();
      
      const blackMoves = getValidMoves(board, 'black');
      const whiteMoves = getValidMoves(board, 'white');
      
      expect(blackMoves).toHaveLength(4);
      expect(whiteMoves).toHaveLength(4);
      
      // 黒の有効な手の確認
      expect(blackMoves).toContainEqual({ row: 2, col: 3 });
      expect(blackMoves).toContainEqual({ row: 3, col: 2 });
      expect(blackMoves).toContainEqual({ row: 4, col: 5 });
      expect(blackMoves).toContainEqual({ row: 5, col: 4 });
    });
  });

  describe('makeMove', () => {
    it('places a piece and flips opponent pieces', () => {
      const board = createInitialBoard();
      const newBoard = makeMove(board, 2, 3, 'black');
      
      // 新しい石が置かれている
      expect(newBoard[2][3]).toBe('black');
      
      // 挟まれた石がひっくり返っている
      expect(newBoard[3][3]).toBe('black');
      
      // 元のボードは変更されていない
      expect(board[2][3]).toBeNull();
      expect(board[3][3]).toBe('white');
    });

    it('does not modify board for invalid moves', () => {
      const board = createInitialBoard();
      const newBoard = makeMove(board, 0, 0, 'black');
      
      // ボードが変更されていない
      expect(newBoard).toEqual(board);
    });
  });

  describe('calculateScore', () => {
    it('counts pieces correctly', () => {
      const board = createInitialBoard();
      const scores = calculateScore(board);
      
      expect(scores.black).toBe(2);
      expect(scores.white).toBe(2);
    });

    it('counts pieces correctly after a move', () => {
      const board = createInitialBoard();
      const newBoard = makeMove(board, 2, 3, 'black');
      const scores = calculateScore(newBoard);
      
      expect(scores.black).toBe(4);
      expect(scores.white).toBe(1);
    });
  });

  describe('isGameOver', () => {
    it('returns false for initial board', () => {
      const board = createInitialBoard();
      expect(isGameOver(board)).toBe(false);
    });

    it('returns true when no valid moves exist', () => {
      // 全て黒の石で埋まったボード
      const board: Board = Array(8).fill(null).map(() => Array(8).fill('black'));
      expect(isGameOver(board)).toBe(true);
    });
  });

  describe('getWinner', () => {
    it('returns correct winner', () => {
      // 黒が多いボード
      const blackWinsBoard: Board = Array(8).fill(null).map(() => Array(8).fill('black'));
      blackWinsBoard[0][0] = 'white';
      
      expect(getWinner(blackWinsBoard)).toBe('black');
      
      // 白が多いボード
      const whiteWinsBoard: Board = Array(8).fill(null).map(() => Array(8).fill('white'));
      whiteWinsBoard[0][0] = 'black';
      
      expect(getWinner(whiteWinsBoard)).toBe('white');
      
      // 引き分け
      const drawBoard: Board = Array(8).fill(null).map((_, i) => 
        Array(8).fill(null).map((_, j) => (i + j) % 2 === 0 ? 'black' : 'white')
      );
      
      expect(getWinner(drawBoard)).toBe('draw');
    });
  });
});