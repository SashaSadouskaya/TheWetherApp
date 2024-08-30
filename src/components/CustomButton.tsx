import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

import {
  DARK_GRAY_COLOR,
  PRIMARY_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';

type ButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  text: string;
  backgroundColor?: string;
  textColor?: string;
};

export const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  disabled = false,
  text,
  backgroundColor = PRIMARY_BLUE_COLOR,
  textColor = WHITE_COLOR,
}) => {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      backgroundColor={backgroundColor}>
      <ButtonText textColor={textColor}>{text}</ButtonText>
    </StyledButton>
  );
};

const StyledButton = styled(TouchableOpacity)<{backgroundColor: string}>`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${props =>
    props.disabled ? DARK_GRAY_COLOR : props.backgroundColor};
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text<{textColor: string}>`
  font-size: 18px;
  color: ${props => props.textColor};
  font-weight: bold;
`;
