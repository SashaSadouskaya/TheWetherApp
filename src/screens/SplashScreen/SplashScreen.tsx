import React, {useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {PRIMARY_BLUE_COLOR, WHITE_COLOR} from '../../constants/colors';
import {Routes} from '../../navigation/Routes';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        navigation.navigate(Routes.HomeScreen);
      }
    });
  }, [fadeAnim, navigation]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <Container>
      <AnimatedText style={{opacity: fadeAnim}}>Get Weather App</AnimatedText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${PRIMARY_BLUE_COLOR};
`;

const AnimatedText = styled(Animated.Text)`
  font-size: 28px;
  color: ${WHITE_COLOR};
  font-weight: bold;
`;
