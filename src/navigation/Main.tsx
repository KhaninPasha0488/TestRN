import React from 'react';
import {Pokemons} from '../screens/Pokemons/Pokemons';
import {RootStackParamsList} from '../screens/types';
import {CurrentPokemon} from '../screens/CurrentPokemon/currentPokemon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator<RootStackParamsList>();
export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          if (route.name === 'Pokemons') {
            iconName = 'pokeball';
          } else if (route.name === 'CurrentPokemon') {
            iconName = 'pokemon-go';
          }
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Pokemons"
        component={Pokemons}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CurrentPokemon"
        component={CurrentPokemon}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
