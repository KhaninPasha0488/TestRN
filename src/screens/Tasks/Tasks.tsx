import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  ListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PADDING} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  getAllTasks,
  getCurrentPokemon,
  refreshAllTasks,
} from '../../store/root';
import {styles} from './styles';
import {TaskCard} from '../../components/TaskCard';
import {TaskItemType} from '../../api/api';
import {useAppNavigation} from '../../hooks/hooks';

const image = {
  uri: 'https://thumb.photo-ac.com/12/1273b3d59042eaccd298f92b943f259c_w.jpeg',
};

const tasks = [
  {
    id: 3,
    title: 'Стирка',
    description:
      'Постирать носки Постирать носки Постирать носки Постирать носки Постирать носки',
    is_done: true,
    is_important: false,
  },
  {
    id: 3,
    title: 'Task2',
    description: 'description2 description2',
    is_done: false,
    is_important: true,
  },
  {
    id: 3,
    title: 'Task3',
    description: '3description description3',
    is_done: false,
    is_important: false,
  },
];
export const Tasks = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  // const tasks = useAppSelector(state => state.root.allTasks);
  const isFetching = useAppSelector(state => state.root.isFetching);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [input, setInput] = useState('');
  const [all, setAll] = useState<boolean>(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(refreshAllTasks())
      .unwrap()
      .then(() => {
        setRefreshing(false);
        setInput('');
      });
  }, [dispatch]);
  const onTaskCard = (item: TaskItemType) => {
    console.log(item);
    navigation.navigate('CurrentTask', {item});
    // dispatch(getCurrentPokemon(id))
    //   .unwrap()
    //   .then(() => {
    //     navigation.navigate('CurrentPokemon');
    //   });
  };
  useEffect(() => {
    dispatch(getAllTasks(offset));
  }, [dispatch, offset]);
  const onEndReached = () => {
    setOffset(offset + 10);
  };
  if (!Object.keys(tasks).length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // @ts-ignore
  const renderItem: ListRenderItem<TaskItemType> = ({item}) => {
    if (input === '') {
      return (
        <TaskCard
          onPress={() => onTaskCard(item)}
          title={item.title}
          description={item.description}
          id={item.id}
          is_done={item.is_done}
          is_important={item.is_important}
        />
      );
    }
    if (item.title.toLowerCase().includes(input.toLowerCase())) {
      return (
        <TaskCard
          onPress={() => onTaskCard(item)}
          title={item.title}
          description={item.description}
          id={item.id}
          is_done={item.is_done}
          is_important={item.is_important}
        />
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
            placeholder="Поиск..."
            style={styles.input}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            paddingHorizontal: 40,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => setAll(true)}
            activeOpacity={0.9}
            style={all && styles.activeBorder}>
            <Text style={all ? styles.activeText : styles.text}>Все</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAll(false)}
            activeOpacity={0.9}
            style={!all && styles.activeBorder}>
            <Text style={!all ? styles.activeText : styles.text}>Важные</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: PADDING}}
          keyExtractor={(item, index) => `${item.title}.${index}`}
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
