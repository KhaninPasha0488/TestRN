import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  ListRenderItem,
  TextInput,
  View,
} from 'react-native';
import {PADDING} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  getAllPokemon,
  getCurrentPokemon,
  refreshAllPokemon,
} from '../../store/root';
import {styles} from './styles';
import {PokemonCard} from '../../components/PokemonCard';
import {PokemonItemType} from '../../api/api';
import {useAppNavigation} from '../../hooks/hooks';

const image = {uri: 'https://slovnet.ru/wp-content/uploads/2018/08/23-36.jpg'};

export const Pokemons = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(state => state.root.allPokemon);
  const isFetching = useAppSelector(state => state.root.isFetching);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [input, setInput] = useState('');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(refreshAllPokemon())
      .unwrap()
      .then(() => {
        setRefreshing(false);
        setInput('');
      });
  }, [dispatch]);
  const onPokemonCard = (url: string) => {
    dispatch(getCurrentPokemon(url))
      .unwrap()
      .then(() => {
        navigation.navigate('CurrentPokemon');
      });
  };
  useEffect(() => {
    dispatch(getAllPokemon(offset));
  }, [dispatch, offset]);
  const onEndReached = () => {
    setOffset(offset + 10);
  };
  if (!Object.keys(pokemons).length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const renderItem: ListRenderItem<PokemonItemType> = ({item}) => {
    if (input === '') {
      return (
        <PokemonCard onPress={onPokemonCard} url={item.url} name={item.name} />
      );
    }
    if (item.name.toLowerCase().includes(input.toLowerCase())) {
      return (
        <PokemonCard onPress={onPokemonCard} url={item.url} name={item.name} />
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.inputBox}>
          <TextInput
            value={input}
            onChangeText={text => setInput(text)}
            placeholder="Search..."
            style={styles.input}
          />
        </View>
        <FlatList
          data={pokemons}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: PADDING}}
          keyExtractor={(item, index) => `${item.name}.${index}`}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={renderItem}
        />
        {isFetching && (
          <ActivityIndicator size="large" style={styles.loadingCard} />
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
