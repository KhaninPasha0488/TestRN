import React from 'react';
import {Tasks} from '../screens/Tasks/Tasks';
import {CurrentTask} from '../screens/CurrentTask/currentTask';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamsList} from '../hooks/hooks';

const Tab = createBottomTabNavigator<RootStackParamsList>();
export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';

          if (route.name === 'Tasks') {
            iconName = 'clipboard-check-multiple-outline';
          } else if (route.name === 'CurrentTask') {
            iconName = 'clipboard-check-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CurrentTask"
        component={CurrentTask}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
