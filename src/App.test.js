import { getByText, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Game from "./Game/Game";

test("renders Welcome to TicTacToe!", () => {
  render(<App />);
  const linkElement = screen.getByText(/"Welcome to TicTacToe!"/i);
  expect(linkElement).toBeInTheDocument();
});

test("toggle player computer", () => {
  render(<App />);
  const linkElement = screen.getByTestId("go-to-start");
  expect(linkElement).toHaveTextContent("Play against computer");

  fireEvent.click(linkElement);
  expect(linkElement).toHaveTextContent("Play against other player");

  fireEvent.click(linkElement);
  expect(linkElement).toHaveTextContent("Play against computer");
});

test("toggle dark light", () => {
  render(<App />);
  const linkElement = document.getElementById("switch");
  var ischecked = linkElement.checked;
  var strchecked = ischecked.toString();
  expect(strchecked).toMatch("false");

  fireEvent.click(linkElement);

  var ischecked = linkElement.checked;
  var strchecked = ischecked.toString();
  expect(strchecked).toMatch("true");

  fireEvent.click(linkElement);

  var ischecked = linkElement.checked;
  var strchecked = ischecked.toString();
  expect(strchecked).toMatch("false");
});
