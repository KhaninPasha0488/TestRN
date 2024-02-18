import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppDispatch} from '../../store/store';
import {styles} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList, useAppNavigation} from '../../hooks/hooks';
import TextField from '../../components/custom/TextField';
import {useCustomFormik} from './hooks/useCustomFormik';
import {TaskItemType} from '../../api/api';
import CheckBox from '@react-native-community/checkbox';

import {
  creatCurrentTask,
  deleteCurrentTask,
  editCurrentTask,
} from '../../store/root';
type CurrentTaskRouteProp = RouteProp<RootStackParamsList, 'CurrentTask'>;
const image = {
  uri: 'https://ic.pics.livejournal.com/antoniusfirst/18636719/13159/13159_900.jpg',
};
export const CurrentTask = () => {
  const route = useRoute<CurrentTaskRouteProp>();
  const navigation = useAppNavigation();
  const {item, create} = route.params;
  const dispatch = useAppDispatch();
  const edit = (item: TaskItemType) => {
    dispatch(editCurrentTask(item))
      .unwrap()
      .then(() => {
        navigation.navigate('Tasks');
      });
  };
  const add = (item: TaskItemType) => {
    dispatch(creatCurrentTask(item))
      .unwrap()
      .then(() => {
        navigation.navigate('Tasks');
        setFieldValue('_id', '');
        setFieldValue('title', '');
        setFieldValue('description', '');
        setFieldValue('is_important', false);
        setFieldValue('is_done', false);
      });
  };
  const {values, handleSubmit, setFieldValue, errors, touched, setValues} =
    useCustomFormik(item, edit, add);
  useEffect(() => {
    if (item && !create) {
      setValues(item);
    } else {
      setFieldValue('_id', '');
      setFieldValue('title', '');
      setFieldValue('description', '');
      setFieldValue('is_important', false);
      setFieldValue('is_done', false);
    }
  }, [item, setFieldValue, setValues, create]);
  if (item && !Object.keys(item).length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const deleteCard = () => {
    item &&
      dispatch(deleteCurrentTask(item))
        .unwrap()
        .then(() => {
          navigation.navigate('Tasks');
        });
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.containerCard}>
            <>
              <Text style={styles.textName}>Task</Text>
              <View style={{width: '90%'}}>
                <TextField
                  placeholder={'Укажите название задачи'}
                  title={'Название задачи'}
                  onChangeText={text => setFieldValue('title', text)}
                  value={values.title}
                  style={styles.text__form}
                  error={!!(errors?.title && touched?.title)}
                  errorText={'Некорректное название'}
                  titleStyle={styles.textFieldStyle}
                />
                <TextField
                  placeholder={'Укажите описание задачи'}
                  title={'Описание задачи'}
                  onChangeText={text => setFieldValue('description', text)}
                  value={values.description}
                  style={styles.text__form}
                  error={!!(errors?.description && touched?.description)}
                  errorText={'Некорректное описание'}
                  titleStyle={styles.textFieldStyle}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <Text style={{marginRight: 5}}>Важная задача</Text>
                <CheckBox
                  disabled={false}
                  value={values.is_important}
                  onValueChange={newValue =>
                    setFieldValue('is_important', newValue)
                  }
                />
              </View>
            </>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            style={[styles.btn, {backgroundColor: '#81a440'}]}>
            <Text style={{fontSize: 18, fontWeight: '900'}}>
              {item ? 'Изменить' : 'Добавить'}
            </Text>
          </TouchableOpacity>
          {item && (
            <TouchableOpacity
              onPress={deleteCard}
              activeOpacity={0.8}
              style={styles.btn}>
              <Text style={{fontSize: 18, fontWeight: '900'}}>Удалить</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
