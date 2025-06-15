import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOthelloGame } from '../useOthelloGame';

describe('useOthelloGame', () => {
  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    expect(result.current.currentPlayer).toBe('black');
    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.scores).toEqual({ black: 2, white: 2 });
    expect(result.current.difficulty).toBe('beginner');
    expect(result.current.board).toHaveLength(8);
    expect(result.current.board[0]).toHaveLength(8);
  });

  it('makes a valid player move', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    act(() => {
      const success = result.current.makePlayerMove(2, 3);
      expect(success).toBe(true);
    });
    
    expect(result.current.board[2][3]).toBe('black');
    expect(result.current.currentPlayer).toBe('white');
    expect(result.current.scores.black).toBeGreaterThan(2);
  });

  it('rejects invalid player move', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    act(() => {
      const success = result.current.makePlayerMove(0, 0);
      expect(success).toBe(false);
    });
    
    expect(result.current.board[0][0]).toBeNull();
    expect(result.current.currentPlayer).toBe('black');
    expect(result.current.scores).toEqual({ black: 2, white: 2 });
  });

  it('rejects move when not player turn', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    // First make a valid move to switch to CPU turn
    act(() => {
      result.current.makePlayerMove(2, 3);
    });
    
    // Now try to make another player move
    act(() => {
      const success = result.current.makePlayerMove(2, 2);
      expect(success).toBe(false);
    });
  });

  it('makes CPU move', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    // Switch to CPU turn first
    act(() => {
      result.current.makePlayerMove(2, 3);
    });
    
    act(() => {
      const success = result.current.makeCPUMove(2, 4);
      expect(success).toBe(true);
    });
    
    expect(result.current.board[2][4]).toBe('white');
    expect(result.current.currentPlayer).toBe('black');
  });

  it('changes difficulty', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    act(() => {
      result.current.setDifficulty('advanced');
    });
    
    expect(result.current.difficulty).toBe('advanced');
  });

  it('resets game', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    // Make some moves first
    act(() => {
      result.current.makePlayerMove(2, 3);
    });
    
    // Reset the game
    act(() => {
      result.current.resetGame();
    });
    
    expect(result.current.currentPlayer).toBe('black');
    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.scores).toEqual({ black: 2, white: 2 });
    expect(result.current.board[2][3]).toBeNull();
  });

  it('checks valid moves correctly', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    expect(result.current.isValidMove(2, 3)).toBe(true);
    expect(result.current.isValidMove(0, 0)).toBe(false);
    expect(result.current.isValidMove(3, 3)).toBe(false); // Already occupied
  });

  it('gets valid moves for current player', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    const validMoves = result.current.getValidMoves();
    
    expect(validMoves).toHaveLength(4);
    expect(validMoves).toContainEqual({ row: 2, col: 3 });
    expect(validMoves).toContainEqual({ row: 3, col: 2 });
    expect(validMoves).toContainEqual({ row: 4, col: 5 });
    expect(validMoves).toContainEqual({ row: 5, col: 4 });
  });

  it('handles cell click correctly', () => {
    const { result } = renderHook(() => useOthelloGame());
    
    act(() => {
      const success = result.current.handleCellClick(2, 3);
      expect(success).toBe(true);
    });
    
    expect(result.current.board[2][3]).toBe('black');
  });
});