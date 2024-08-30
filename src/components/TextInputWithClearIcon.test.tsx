import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TextInputWithClearIcon} from './TextInputWithClearIcon';

describe('TextInputWithClearIcon', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the text input correctly', () => {
    const {getByPlaceholderText} = render(
      <TextInputWithClearIcon
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Type something..."
      />,
    );

    expect(getByPlaceholderText('Type something...')).toBeTruthy();
  });

  it('should display the clear icon when there is text', () => {
    const {getByTestId} = render(
      <TextInputWithClearIcon
        value="Test"
        onChangeText={mockOnChangeText}
        placeholder="Type something..."
      />,
    );

    expect(getByTestId('clear-button')).toBeTruthy();
  });

  it('should not display the clear icon when there is no text', () => {
    const {queryByTestId} = render(
      <TextInputWithClearIcon
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Type something..."
      />,
    );

    expect(queryByTestId('clear-button')).toBeNull();
  });

  it('should clear the text when the clear icon is pressed', () => {
    const {getByTestId} = render(
      <TextInputWithClearIcon
        value="Test"
        onChangeText={mockOnChangeText}
        placeholder="Type something..."
      />,
    );

    fireEvent.press(getByTestId('clear-button'));

    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });

  it('should update the text when the user types', () => {
    const {getByPlaceholderText} = render(
      <TextInputWithClearIcon
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Type something..."
      />,
    );

    const input = getByPlaceholderText('Type something...');

    fireEvent.changeText(input, 'New text');

    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });
});
