import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
type PokemonCardType = {
  onPress: (url: string) => void;
  url: string;
  name: string;
};

export const PokemonCard = ({onPress, url, name}: PokemonCardType) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(url);
      }}
      style={styles.box}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
