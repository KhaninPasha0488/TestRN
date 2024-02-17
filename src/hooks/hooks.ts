import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TaskItemType} from '../api/api';

export type RootStackParamsList = {
  Tasks: undefined;
  CurrentTask: {item: TaskItemType};
};

export type UseNavigationType = NavigationProp<RootStackParamsList>;
export const useAppNavigation = () => useNavigation<UseNavigationType>();
