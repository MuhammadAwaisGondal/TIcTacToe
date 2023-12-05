import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Player from './Player';

describe('Player component', () => {
  test('Enable input field on Edit button click', () => {
    const { getByText, getByDisplayValue } = render(<Player id={"player1"} name="Florian" symbol="X" />);
    
    const editButton = getByText('Edit');
    fireEvent.click(editButton);

    const inputField = getByDisplayValue('Florian');
    expect(inputField).toBeEnabled();
  });
});


describe('Player component', () => {
    test('Disable input field on Save button click', () => {
      const { getByText, getByDisplayValue } = render(<Player id={"player1"} name="Florian" symbol="X" />);
      
      const editButton = getByText('Edit');
      fireEvent.click(editButton);
  
      const inputField = getByDisplayValue('Florian');
      expect(inputField).toBeEnabled();
  
      const saveButton = getByText('Save');
      fireEvent.click(saveButton);

      expect(inputField).toBeDisabled();
    });
  });

