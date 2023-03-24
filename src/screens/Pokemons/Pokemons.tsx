import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PADDING} from '../../constants/constants';
import {useAppNavigation} from '../types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  getAllPokemonTC,
  getCurrentPokemonTC,
  refreshAllPokemonTC,
} from '../../store/root';
import {styles} from './styles';

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
    dispatch(refreshAllPokemonTC())
      .unwrap()
      .then(() => {
        setRefreshing(false);
        setInput('');
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllPokemonTC(offset));
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
          // @ts-ignore
          renderItem={({item}) => {
            if (input === '') {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getCurrentPokemonTC(item.url))
                      .unwrap()
                      .then(() => {
                        navigation.navigate('CurrentPokemon');
                      });
                  }}
                  style={styles.box}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              );
            }
            if (item.name.toLowerCase().includes(input.toLowerCase())) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getCurrentPokemonTC(item.url))
                      .unwrap()
                      .then(() => {
                        navigation.navigate('CurrentPokemon');
                      });
                  }}
                  style={styles.box}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
        {isFetching && (
          <ActivityIndicator size="large" style={styles.loadingCard} />
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
