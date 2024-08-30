import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {
  ClearButton,
  ClearIcon,
  ClearIconLineRotated45,
  ClearIconLineRotatedMinus45,
} from './TextInputWithClearIcon';
import {
  BORDER_COLOR,
  PRIMARY_BLUE_COLOR,
  PRIMARY_TEXT_COLOR,
  WHITE_COLOR,
} from '../constants/colors';

type FavoriteCityListProps = {
  favoriteCities: string[];
  onDelete: (cityName: string) => void;
  onFavoriteCityPress: (cityName: string) => void;
};

type FavoriteCityItemProps = {
  cityName: string;
  onDelete: (cityName: string) => void;
  onFavoriteCityPress: (cityName: string) => void;
};

export const FavoriteCitiesList: React.FC<FavoriteCityListProps> = ({
  favoriteCities,
  onDelete,
  onFavoriteCityPress,
}) => {
  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <FavoriteCityItem
        cityName={item}
        onDelete={onDelete}
        onFavoriteCityPress={onFavoriteCityPress}
      />
    ),
    [onDelete, onFavoriteCityPress],
  );

  return (
    <Container>
      <FavoriteCityTitle>Favorite Cities:</FavoriteCityTitle>
      <FlatList
        data={[...favoriteCities].reverse()}
        renderItem={renderItem}
        keyExtractor={item => item}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const FavoriteCityItem: React.FC<FavoriteCityItemProps> = React.memo(
  ({cityName, onDelete, onFavoriteCityPress}) => {
    const handleDeletePress = useCallback(
      () => onDelete(cityName),
      [cityName, onDelete],
    );

    return (
      <FavoriteCityContainer>
        <FavoriteCityNameContainer
          onPress={() => onFavoriteCityPress(cityName)}>
          <FavoriteCityName>{cityName}</FavoriteCityName>
        </FavoriteCityNameContainer>
        <ClearButton
          testID={`delete-button-${cityName}`}
          onPress={handleDeletePress}>
          <ClearIcon>
            <ClearIconLineRotated45 />
            <ClearIconLineRotatedMinus45 />
          </ClearIcon>
        </ClearButton>
      </FavoriteCityContainer>
    );
  },
);

const Container = styled.View`
  margin-top: 20px;
  padding: 10px;
  background-color: ${WHITE_COLOR};
  border-radius: 5px;
  border: 1px solid ${BORDER_COLOR};
  width: 100%;
  max-height: 200px;
  overflow: hidden;
`;

const FavoriteCityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FavoriteCityNameContainer = styled.TouchableOpacity``;

const FavoriteCityName = styled.Text`
  font-size: 18px;
  color: ${PRIMARY_TEXT_COLOR};
  padding: 8px 0;
  flex: 1;
`;

const FavoriteCityTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${PRIMARY_BLUE_COLOR};
  margin-bottom: 10px;
`;
