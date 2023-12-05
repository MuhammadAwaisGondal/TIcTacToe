import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

test('X should be blue and O should be green', () => {
  render(<Game />);

  // Get all squares
  const squares = screen.getAllByTestId('square');

  // Click on each square and check the color
  squares.forEach((square) => {
    fireEvent.click(square);

    if (square.textContent === 'X') {
      expect(square).toHaveClass('green');
    } else if (square.textContent === 'O') {
      expect(square).toHaveClass('pink');
    }
  });
});

test('Go to start button should reset the game to the initial state', () => {
    render(<Game />);
  
    // Make some moves
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
  
    // Get the "Go to start" button
    const goToStartButton = screen.getByText('Go to game start');
  
    // Click the "Go to start" button
    fireEvent.click(goToStartButton);
  
    // Check if the game status is back to the initial state
    const status = screen.getByText('Next player is: Player 1');
    expect(status).toBeInTheDocument();
  
    // Check if the moves history is back to the initial state
    const moves = screen.getAllByTestId('history-move');
    expect(moves.length).toBe(1); // There should be only one move (initial state)
  });


  