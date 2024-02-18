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
  deleteCurrentTask,
  getAllTasks,
  refreshAllTasks,
  updateCurrentTask,
} from '../../store/root';
import {styles} from './styles';
import {TaskCard} from '../../components/TaskCard';
import {TaskItemType} from '../../api/api';
import {useAppNavigation} from '../../hooks/hooks';

const image = {
  uri: 'https://thumb.photo-ac.com/12/1273b3d59042eaccd298f92b943f259c_w.jpeg',
};

export const Tasks = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.root.allTasks);
  const [filterTasks, setTasks] = useState<TaskItemType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [input, setInput] = useState('');
  const [all, setAll] = useState<boolean>(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(refreshAllTasks())
      .unwrap()
      .then(() => {
        // setTasks(AllTask);
        setRefreshing(false);
        setInput('');
      });
  }, [dispatch]);
  const onTaskCard = (item: TaskItemType) => {
    navigation.navigate('CurrentTask', {item});
  };
  const onFilterCard = () => {
    setTasks(tasks.filter(e => e.is_important));
  };
  const onCreateTaskCard = () => {
    navigation.navigate('CurrentTask', {create: true});
  };
  const deleteCard = (item: TaskItemType) => {
    dispatch(deleteCurrentTask(item))
      .unwrap()
      .then(() => {
        setRefreshing(false);
        setInput('');
      });
  };
  const updateCard = (_id: string, isDone: boolean) => {
    dispatch(
      updateCurrentTask({
        _id,
        is_done: isDone,
      }),
    )
      .unwrap()
      .then(() => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    dispatch(getAllTasks())
      .unwrap()
      .then(() => {
        // setTasks(AllTask);
        setRefreshing(false);
        setInput('');
      });
  }, [dispatch]);

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
          deleteCard={() => deleteCard(item)}
          updateCard={updateCard}
          title={item.title}
          description={item.description}
          _id={item._id}
          is_done={item.is_done}
          is_important={item.is_important}
        />
      );
    }
    if (item.title.toLowerCase().includes(input.toLowerCase())) {
      return (
        <TaskCard
          onPress={() => onTaskCard(item)}
          deleteCard={() => deleteCard(item)}
          updateCard={updateCard}
          title={item.title}
          description={item.description}
          _id={item._id}
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
            onPress={() => {
              setAll(true);
              onRefresh();
            }}
            activeOpacity={0.9}
            style={all && styles.activeBorder}>
            <Text style={all ? styles.activeText : styles.text}>Все</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAll(false);
              onFilterCard();
            }}
            activeOpacity={0.9}
            style={!all && styles.activeBorder}>
            <Text style={!all ? styles.activeText : styles.text}>Важные</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={onCreateTaskCard}
            activeOpacity={0.9}
            style={{
              borderRadius: 16,
              borderWidth: 1,
              padding: 5,
              width: 170,
              backgroundColor: '#d5a288',
            }}>
            <Text style={styles.activeText}> + Добавить</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={all ? tasks : filterTasks}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: PADDING}}
          keyExtractor={(item, index) => `${item.title}.${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={renderItem}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
