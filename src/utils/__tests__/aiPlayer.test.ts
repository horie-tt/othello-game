import { describe, it, expect, vi } from 'vitest';
import { getBeginnerMove, getIntermediateMove, getAdvancedMove, getAIMove } from '../aiPlayer';
import { createInitialBoard, getValidMoves } from '../gameLogic';

describe('aiPlayer', () => {
  describe('getBeginnerMove', () => {
    it('returns a valid move', () => {
      const board = createInitialBoard();
      const move = getBeginnerMove(board);
      
      expect(move).toBeDefined();
      if (move) {
        const validMoves = getValidMoves(board, 'white');
        expect(validMoves).toContainEqual(move);
      }
    });

    it('returns null when no valid moves exist', () => {
      // 全て黒の石で埋まったボード
      const board = Array(8).fill(null).map(() => Array(8).fill('black'));
      const move = getBeginnerMove(board);
      
      expect(move).toBeNull();
    });

    it('uses randomness', () => {
      const board = createInitialBoard();
      const moves = new Set();
      
      // 複数回実行して異なる手が選ばれることを確認
      for (let i = 0; i < 20; i++) {
        const move = getBeginnerMove(board);
        if (move) {
          moves.add(`${move.row}-${move.col}`);
        }
      }
      
      // 少なくとも2つの異なる手が選ばれるはず
      expect(moves.size).toBeGreaterThan(1);
    });
  });

  describe('getIntermediateMove', () => {
    it('returns a valid move', () => {
      const board = createInitialBoard();
      const move = getIntermediateMove(board);
      
      expect(move).toBeDefined();
      if (move) {
        const validMoves = getValidMoves(board, 'white');
        expect(validMoves).toContainEqual(move);
      }
    });

    it('returns null when no valid moves exist', () => {
      const board = Array(8).fill(null).map(() => Array(8).fill('black'));
      const move = getIntermediateMove(board);
      
      expect(move).toBeNull();
    });
  });

  describe('getAdvancedMove', () => {
    it('returns a valid move', () => {
      const board = createInitialBoard();
      const move = getAdvancedMove(board);
      
      expect(move).toBeDefined();
      if (move) {
        const validMoves = getValidMoves(board, 'white');
        expect(validMoves).toContainEqual(move);
      }
    });

    it('returns null when no valid moves exist', () => {
      const board = Array(8).fill(null).map(() => Array(8).fill('black'));
      const move = getAdvancedMove(board);
      
      expect(move).toBeNull();
    });
  });

  describe('getAIMove', () => {
    it('calls appropriate AI function based on difficulty', () => {
      const board = createInitialBoard();
      
      const beginnerMove = getAIMove(board, 'beginner');
      const intermediateMove = getAIMove(board, 'intermediate');
      const advancedMove = getAIMove(board, 'advanced');
      
      expect(beginnerMove).toBeDefined();
      expect(intermediateMove).toBeDefined();
      expect(advancedMove).toBeDefined();
      
      // 全て有効な手であることを確認
      const validMoves = getValidMoves(board, 'white');
      if (beginnerMove) expect(validMoves).toContainEqual(beginnerMove);
      if (intermediateMove) expect(validMoves).toContainEqual(intermediateMove);
      if (advancedMove) expect(validMoves).toContainEqual(advancedMove);
    });

    it('defaults to beginner for unknown difficulty', () => {
      const board = createInitialBoard();
      // @ts-ignore - Testing unknown difficulty
      const move = getAIMove(board, 'unknown');
      
      expect(move).toBeDefined();
      if (move) {
        const validMoves = getValidMoves(board, 'white');
        expect(validMoves).toContainEqual(move);
      }
    });
  });
});