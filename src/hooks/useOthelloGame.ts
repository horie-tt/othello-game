import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, Player, Difficulty, Position } from '../types/game';
import {
  createInitialBoard,
  isValidMove,
  getValidMoves,
  makeMove,
  calculateScore,
  isGameOver,
  getWinner
} from '../utils/gameLogic';

// ゲーム状態の初期値
const initialState: GameState = {
  board: createInitialBoard(),
  currentPlayer: 'black', // プレイヤーは常に黒
  gameStatus: 'playing', // 'playing', 'finished'
  scores: { black: 2, white: 2 },
  validMoves: [],
  difficulty: 'beginner'
};

// アクションタイプ
const actionTypes = {
  MAKE_MOVE: 'MAKE_MOVE',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  RESET_GAME: 'RESET_GAME',
  SET_VALID_MOVES: 'SET_VALID_MOVES'
};

// リデューサー関数
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case actionTypes.MAKE_MOVE: {
      const { row, col, player } = action.payload;
      const newBoard = makeMove(state.board, row, col, player);
      const newScores = calculateScore(newBoard);
      
      // 次のプレイヤーを決定
      let nextPlayer = player === 'black' ? 'white' : 'black';
      let gameStatus = state.gameStatus;
      
      // ゲーム終了判定
      if (isGameOver(newBoard)) {
        gameStatus = 'finished';
      } else {
        // 次のプレイヤーが打てない場合はスキップ
        const nextPlayerMoves = getValidMoves(newBoard, nextPlayer);
        if (nextPlayerMoves.length === 0) {
          nextPlayer = player; // 現在のプレイヤーが続行
        }
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        gameStatus,
        scores: newScores
      };
    }

    case actionTypes.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
      };

    case actionTypes.RESET_GAME: {
      const newBoard = createInitialBoard();
      return {
        ...initialState,
        board: newBoard,
        difficulty: state.difficulty
      };
    }

    case actionTypes.SET_VALID_MOVES:
      return {
        ...state,
        validMoves: action.payload
      };

    default:
      return state;
  }
};

// カスタムフック
export const useOthelloGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 手を打つ
  const makePlayerMove = useCallback((row: number, col: number): boolean => {
    if (state.gameStatus !== 'playing' || state.currentPlayer !== 'black') {
      return false;
    }

    if (!isValidMove(state.board, row, col, 'black')) {
      return false;
    }

    dispatch({
      type: actionTypes.MAKE_MOVE,
      payload: { row, col, player: 'black' }
    });

    return true;
  }, [state.board, state.currentPlayer, state.gameStatus]);

  // CPUの手を打つ
  const makeCPUMove = useCallback((row: number, col: number): boolean => {
    if (state.gameStatus !== 'playing' || state.currentPlayer !== 'white') {
      return false;
    }

    dispatch({
      type: actionTypes.MAKE_MOVE,
      payload: { row, col, player: 'white' }
    });

    return true;
  }, [state.currentPlayer, state.gameStatus]);

  // 難易度設定
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({
      type: actionTypes.SET_DIFFICULTY,
      payload: difficulty
    });
  }, []);

  // ゲームリセット
  const resetGame = useCallback(() => {
    dispatch({ type: actionTypes.RESET_GAME });
  }, []);

  // 有効な手を取得
  const updateValidMoves = useCallback((player: Player): Position[] => {
    const validMoves = getValidMoves(state.board, player);
    dispatch({
      type: actionTypes.SET_VALID_MOVES,
      payload: validMoves
    });
    return validMoves;
  }, [state.board]);

  // セルクリック処理
  const handleCellClick = useCallback((row: number, col: number): boolean => {
    return makePlayerMove(row, col);
  }, [makePlayerMove]);

  return {
    // 状態
    board: state.board,
    currentPlayer: state.currentPlayer,
    gameStatus: state.gameStatus,
    scores: state.scores,
    difficulty: state.difficulty,
    validMoves: state.validMoves,
    
    // アクション
    makePlayerMove,
    makeCPUMove,
    setDifficulty,
    resetGame,
    updateValidMoves,
    handleCellClick,
    
    // ヘルパー関数
    isValidMove: (row: number, col: number) => isValidMove(state.board, row, col, state.currentPlayer),
    getValidMoves: (player?: Player) => getValidMoves(state.board, player || state.currentPlayer),
    isGameOver: () => isGameOver(state.board),
    getWinner: () => getWinner(state.board)
  };
};