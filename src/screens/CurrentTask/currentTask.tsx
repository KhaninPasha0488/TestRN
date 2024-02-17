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
import {useAppSelector} from '../../store/store';
import {styles} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../hooks/hooks';
import TextField from '../../components/custom/TextField';
import {useCustomFormik} from './hooks/useCustomFormik';
import {TaskItemType} from '../../api/api';
import {SafeAreaView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
type CurrentTaskRouteProp = RouteProp<RootStackParamsList, 'CurrentTask'>;
const image = {
  uri: 'https://ic.pics.livejournal.com/antoniusfirst/18636719/13159/13159_900.jpg',
};
export const CurrentTask = () => {
  const route = useRoute<CurrentTaskRouteProp>();
  const {item} = route.params;
  const edit = (item: TaskItemType) => {
    console.log(item);
  };
  const add = (item: TaskItemType) => {
    console.log(item);
  };

  const {values, handleSubmit, setFieldValue, errors, touched, setValues} =
    useCustomFormik(item, edit, add);
  useEffect(() => {
    if (item) {
      setValues(item);
      // setFieldValue('id', item.id);
      // setFieldValue('title', item.title);
      // setFieldValue('description', item.description);
      // setFieldValue('is_important', item.is_important);
      // setFieldValue('is_done', item.is_done);
    } else {
      setFieldValue('id', 0);
      setFieldValue('title', '');
      setFieldValue('description', '');
      setFieldValue('is_important', '');
      setFieldValue('is_done', '');
    }
  }, [item]);
  // const currentPokemon = useAppSelector(state => state.root.currentPokemon);
  if (!Object.keys(item).length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.containerCard}>
            {item && (
              <>
                <CheckBox
                  disabled={false}
                  value={values.is_done}
                  onValueChange={newValue => setFieldValue('is_done', newValue)}
                />
                <Text style={styles.textName}>Task</Text>
                <View style={{width: '90%'}}>
                  <TextField
                    placeholder={'Укажите название задачи'}
                    title={'Название задачи'}
                    onChangeText={text => setFieldValue('title', text)}
                    value={values?.title}
                    style={styles.text__form}
                    error={!!(errors?.title && touched?.title)}
                    errorText={'Некорректное название'}
                    titleStyle={styles.textFieldStyle}
                  />
                  <TextField
                    placeholder={'Укажите описание задачи'}
                    title={'Описание задачи'}
                    onChangeText={text => setFieldValue('description', text)}
                    value={values?.description}
                    style={styles.text__form}
                    error={!!(errors?.description && touched?.description)}
                    errorText={'Некорректное описание'}
                    titleStyle={styles.textFieldStyle}
                  />
                </View>
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            style={[styles.btn, {backgroundColor: '#81a440'}]}>
            <Text style={{fontSize: 18, fontWeight: '900'}}>
              {item ? 'Изменить' : 'Сохранить'}
            </Text>
          </TouchableOpacity>
          {item && (
            <TouchableOpacity
              onPress={handleSubmit}
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
