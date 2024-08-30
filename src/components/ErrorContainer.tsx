import React from 'react';
import styled from 'styled-components/native';

import {ERROR_TEXT_COLOR} from '../constants/colors';

type ErrorContainerProps = {
  message: string;
};

export const ErrorContainer: React.FC<ErrorContainerProps> = ({message}) => {
  return (
    <Container>
      <ErrorText>{message}</ErrorText>
    </Container>
  );
};

const Container = styled.View`
  height: 18px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${ERROR_TEXT_COLOR};
`;
