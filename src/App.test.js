import { getByText, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Game from './Game/Game';

test('renders Welcome to TicTacToe!', () => {
  render(<App />);
  const linkElement = screen.getByText(/"Welcome to TicTacToe!"/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render App Component', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText('Welcome to TicTacToe!');
  expect(welcomeElement).toBeInTheDocument();
});

test('Render Game Component', () => {
  const { getByText } = render(<Game />);
  const statusElement = getByText('Next player:');
  expect(statusElement).toBeInTheDocument();
});

test('Make a Move in the Game', () => {
  const { getByText, getByTestId } = render(<App />);
  const switchElement = getByText('☀︎');
  fireEvent.click(switchElement); // Toggle to dark mode

  const squareElement = getByTestId('square-0'); // Assuming you have a data-testid for the squares
  fireEvent.click(squareElement);

  const statusElement = getByText('Next player:');
  const moveElement = getByText('Go to game start');
  expect(statusElement).toBeInTheDocument();
  expect(moveElement).toBeInTheDocument();
});

test('Switch Players During the Game', () => {
  const { getByText, getByTestId } = render(<App />);
  const switchElement = getByText('☀︎');
  fireEvent.click(switchElement); // Toggle to dark mode

  // Make moves and check player alternation
  const square0 = getByTestId('square-0');
  const square1 = getByTestId('square-1');
  fireEvent.click(square0);
  expect(getByText('Next player:')).toHaveTextContent('Next player: Player O');
  fireEvent.click(square1);
  expect(getByText('Next player:')).toHaveTextContent('Next player: Player X');
});

test('Game Result and Reset', () => {
  const { getByText, getByTestId } = render(<App />);
  const switchElement = getByText('☀︎');
  fireEvent.click(switchElement); // Toggle to dark mode

  // Play through a complete game
  const squares = Array.from({ length: 9 }, (_, i) => getByTestId(`square-${i}`));
  fireEvent.click(squares[0]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[2]);

  // Check the game result
  expect(getByText('Game Result: Player X Wins!')).toBeInTheDocument();

  // Reset the game
  const resetButton = getByText('Go to game start');
  fireEvent.click(resetButton);

  // Check that the game is reset
  expect(getByText('Next player:')).toHaveTextContent('Next player: Player X');
});

test('Input Validation for Player Names', () => {
  const { getByText, getByLabelText } = render(<App />);
  const switchElement = getByText('☀︎');
  fireEvent.click(switchElement); // Toggle to dark mode

  // Input invalid player names
  const player1Input = getByLabelText('Player 1:');
  const player2Input = getByLabelText('Player 2:');
  fireEvent.change(player1Input, { target: { value: '' } });
  fireEvent.change(player2Input, { target: { value: 'NameExceedingLimit' } });

  // Check for validation messages
  expect(getByText('Please enter a valid name for Player 1')).toBeInTheDocument();
  expect(getByText('Player 2 name should not exceed 10 characters')).toBeInTheDocument();
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

test('toggle dark light', () => {
  render(<App />);
  const linkElement = document.getElementById("switch");
  var ischecked=linkElement.checked;
  var strchecked=ischecked.toString();
  expect(strchecked).toMatch("false");

  fireEvent.click(linkElement);

  var ischecked=linkElement.checked;
  var strchecked=ischecked.toString();
  expect(strchecked).toMatch("true");

  fireEvent.click(linkElement);

  var ischecked=linkElement.checked;
  var strchecked=ischecked.toString();
  expect(strchecked).toMatch("false");

});
