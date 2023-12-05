import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import Game from './Game/Game';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Toggle to Dark Mode', () => {
  const { getByText } = render(<App />);
  
  // Find the switch element
  const switchElement = getByText('☀︎');
  
  // Simulate a click on the switch
  fireEvent.click(switchElement);
  
  // Check if the dark mode class is applied to the container
  const container = getByText('Welcome to TicTacToe!').closest('.dark-mode');
  expect(container).toBeInTheDocument();
});

test('Toggle to Light Mode', () => {
  const { getByText } = render(<App />);
  
  // Find the switch element
  const switchElement = getByText('☀︎');
  
  // Simulate a click on the switch
  fireEvent.click(switchElement);
  
  // Simulate another click to toggle back to light mode
  fireEvent.click(switchElement);

  // Check if the light mode class is applied to the container
  const container = getByText('Welcome to TicTacToe!').closest('.light-mode');
  expect(container).toBeInTheDocument();
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
