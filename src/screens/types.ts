import {NavigationProp, useNavigation} from '@react-navigation/native';

export type RootStackParamsList = {
  Pokemons: undefined;
  CurrentPokemon: undefined;
  // CurrentPokemon: {
  //   url: string;
  // };
};

export type UseNavigationType = NavigationProp<RootStackParamsList>;
export const useAppNavigation = () => useNavigation<UseNavigationType>();
