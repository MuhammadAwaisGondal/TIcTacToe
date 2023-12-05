import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import App from '../App';

test('Render Game Component', () => {
  render(<Game />);
  const statusElement = screen.getByText(/Next player is: Player 1/i);
  expect(statusElement).toBeInTheDocument();
});

test('X should be pink and O should be green', () => {
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

  test('Make a Move in the Game', () => {
    const { getByText, getAllByTestId } = render(<App />);
    
    const switchElement = getByText('☀︎');
    fireEvent.click(switchElement); // Toggle to dark mode
    
    // Query all elements with data-testid="square"
    const squareElements = getAllByTestId('square');
    fireEvent.click(squareElements[0]); // Assuming you want to click the first square
    
    const statusElement = screen.getByText(/Next player is:/i);
    const moveElement = getByText('Go to game start');
    
    expect(statusElement).toBeInTheDocument();
    expect(moveElement).toBeInTheDocument();
  });
  
test('toggle player computer', () => {

  render(<App />);
  const linkElement = screen.getByTestId("go-to-start");
  expect(linkElement).toHaveTextContent("Play against computer");

  fireEvent.click(linkElement);
  expect(linkElement).toHaveTextContent("Play against other player");

  fireEvent.click(linkElement);
  expect(linkElement).toHaveTextContent("Play against computer");
});

test('Player vs Computer toggle should reset the game state', () => {
  render(<Game />);
  const squares = screen.getAllByTestId('square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);

  const toggleButton = screen.getByTestId('go-to-start');
  fireEvent.click(toggleButton);

  const status = screen.getByText('Next player is: Player 1');
  expect(status).toBeInTheDocument();

  const moves = screen.getAllByTestId('history-move');
  expect(moves.length).toBe(1);
});

test('Computer makes a move in single-player mode', () => {
  const { getAllByTestId } = render(<Game />);
  const toggleButton = screen.getByTestId('go-to-start');
  fireEvent.click(toggleButton); // Switch to single-player mode

  const squares = getAllByTestId('square');
  fireEvent.click(squares[0]); // Player makes a move

  const updatedSquares = getAllByTestId('square');
  const computerMove = updatedSquares.filter((square) => square.textContent === 'O');
  expect(computerMove.length).toBe(1);
});