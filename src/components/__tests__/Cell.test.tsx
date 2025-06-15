import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cell from '../Cell';

describe('Cell', () => {
  const defaultProps = {
    value: null,
    row: 0,
    col: 0,
    onClick: vi.fn(),
    isValidMove: false,
    isPlayerTurn: false,
  };

  it('renders empty cell', () => {
    const { container } = render(<Cell {...defaultProps} />);
    const cell = container.firstChild as HTMLElement;
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass('aspect-square');
  });

  it('renders black piece', () => {
    render(<Cell {...defaultProps} value="black" />);
    const blackPiece = screen.getByText('●');
    expect(blackPiece).toBeInTheDocument();
  });

  it('renders white piece', () => {
    render(<Cell {...defaultProps} value="white" />);
    const whitePiece = screen.getByText('○');
    expect(whitePiece).toBeInTheDocument();
  });

  it('shows valid move indicator when it is player turn and move is valid', () => {
    const { container } = render(
      <Cell {...defaultProps} isValidMove={true} isPlayerTurn={true} />
    );
    
    // 有効な手のインジケーターが表示されているかチェック
    const validMoveIndicator = container.querySelector('.bg-gray-600');
    expect(validMoveIndicator).toBeInTheDocument();
  });

  it('does not show valid move indicator when not player turn', () => {
    const { container } = render(
      <Cell {...defaultProps} isValidMove={true} isPlayerTurn={false} />
    );
    
    const validMoveIndicator = container.querySelector('.bg-gray-600');
    expect(validMoveIndicator).not.toBeInTheDocument();
  });

  it('calls onClick when clicked on valid move', () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell {...defaultProps} onClick={onClickMock} isValidMove={true} isPlayerTurn={true} />
    );
    
    const cell = container.firstChild as HTMLElement;
    fireEvent.click(cell);
    
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it('does not call onClick when move is invalid', () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell {...defaultProps} onClick={onClickMock} isValidMove={false} isPlayerTurn={true} />
    );
    
    const cell = container.firstChild as HTMLElement;
    fireEvent.click(cell);
    
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('applies correct CSS classes for valid moves', () => {
    const { container } = render(
      <Cell {...defaultProps} isValidMove={true} isPlayerTurn={true} />
    );
    
    const cell = container.firstChild as HTMLElement;
    expect(cell).toHaveClass('cursor-pointer');
    expect(cell).toHaveClass('hover:bg-green-400');
  });

  it('applies cursor-not-allowed for invalid moves', () => {
    const { container } = render(
      <Cell {...defaultProps} isValidMove={false} isPlayerTurn={true} />
    );
    
    const cell = container.firstChild as HTMLElement;
    expect(cell).toHaveClass('cursor-not-allowed');
  });
});