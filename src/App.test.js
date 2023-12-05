
import { getByText, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Game from "./Game/Game";

test('Render App Component', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/"Welcome to TicTacToe!"/i);
  expect(welcomeElement).toBeInTheDocument();
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
