import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {useAppSelector} from '../../store/store';
import {styles} from './styles';

export const CurrentPokemon = () => {
  const currentPokemon = useAppSelector(state => state.root.currentPokemon);
  if (!Object.keys(currentPokemon).length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        {currentPokemon && (
          <>
            <Text style={styles.textId}>#{currentPokemon.id}</Text>
            <Text style={styles.textName}>{currentPokemon.name}</Text>
            <Image
              source={{
                uri: currentPokemon.sprites.other['official-artwork']
                  .front_default,
              }}
              style={styles.imege}
            />
          </>
        )}
      </View>
    </View>
  );
};
