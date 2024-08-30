import React, {memo, useCallback} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

import {
  BORDER_COLOR,
  DARK_GRAY_COLOR,
  PRIMARY_TEXT_COLOR,
  WHITE_COLOR,
} from '../constants/colors';

type TextInputWithClearProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

export const TextInputWithClearIcon: React.FC<TextInputWithClearProps> = memo(
  ({value, onChangeText, placeholder, ...rest}) => {
    const handleClearPress = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    return (
      <InputContainer>
        <StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...rest}
        />
        {value.length > 0 && (
          <ClearButton onPress={handleClearPress} testID="clear-button">
            <ClearIcon>
              <ClearIconLineRotated45 />
              <ClearIconLineRotatedMinus45 />
            </ClearIcon>
          </ClearButton>
        )}
      </InputContainer>
    );
  },
);

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  height: 50px;
  border: 1px solid ${BORDER_COLOR};
  margin-bottom: 10px;
  background-color: ${WHITE_COLOR};
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${PRIMARY_TEXT_COLOR};
  padding: 5px 10px;
  height: 50px;
`;

export const ClearIcon = styled.View`
  position: relative;
  width: 14px;
  height: 14px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export const ClearIconLine = styled.View`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: ${DARK_GRAY_COLOR};
`;

export const ClearIconLineRotated45 = styled(ClearIconLine)`
  transform: rotate(45deg);
`;

export const ClearIconLineRotatedMinus45 = styled(ClearIconLine)`
  transform: rotate(-45deg);
`;
