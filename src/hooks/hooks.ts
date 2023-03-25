import {NavigationProp, useNavigation} from '@react-navigation/native';

export type RootStackParamsList = {
  Pokemons: undefined;
  CurrentPokemon: undefined;
};

export type UseNavigationType = NavigationProp<RootStackParamsList>;
export const useAppNavigation = () => useNavigation<UseNavigationType>();
