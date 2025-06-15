import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameInfo from '../GameInfo';

describe('GameInfo', () => {
  const defaultProps = {
    currentPlayer: 'black' as const,
    scores: { black: 2, white: 2 },
    gameStatus: 'playing' as const,
  };

  it('renders game information', () => {
    render(<GameInfo {...defaultProps} />);
    
    expect(screen.getByText('ゲーム情報')).toBeInTheDocument();
    expect(screen.getByText('あなた')).toBeInTheDocument();
    expect(screen.getByText('CPU')).toBeInTheDocument();
  });

  it('displays correct scores', () => {
    render(<GameInfo {...defaultProps} scores={{ black: 5, white: 3 }} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows player turn message when it is black turn', () => {
    render(<GameInfo {...defaultProps} currentPlayer="black" />);
    
    expect(screen.getByText('あなたの番です')).toBeInTheDocument();
  });

  it('shows CPU thinking message when it is white turn', () => {
    render(<GameInfo {...defaultProps} currentPlayer="white" />);
    
    expect(screen.getByText('CPUが考えています...')).toBeInTheDocument();
  });

  it('shows victory message when black wins', () => {
    render(
      <GameInfo 
        {...defaultProps} 
        gameStatus="finished" 
        scores={{ black: 32, white: 31 }} 
      />
    );
    
    expect(screen.getByText('🎉 あなたの勝利！')).toBeInTheDocument();
  });

  it('shows defeat message when white wins', () => {
    render(
      <GameInfo 
        {...defaultProps} 
        gameStatus="finished" 
        scores={{ black: 30, white: 34 }} 
      />
    );
    
    expect(screen.getByText('💻 CPUの勝利！')).toBeInTheDocument();
  });

  it('shows draw message when scores are equal', () => {
    render(
      <GameInfo 
        {...defaultProps} 
        gameStatus="finished" 
        scores={{ black: 32, white: 32 }} 
      />
    );
    
    expect(screen.getByText('🤝 引き分け！')).toBeInTheDocument();
  });

  it('renders black and white piece indicators', () => {
    render(<GameInfo {...defaultProps} />);
    
    expect(screen.getByText('●')).toBeInTheDocument();
    expect(screen.getByText('○')).toBeInTheDocument();
  });
});