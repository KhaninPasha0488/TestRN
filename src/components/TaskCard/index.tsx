import {Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TaskItemType} from '../../api/api';
type TaskCardType = {
  onPress: () => void;
  deleteCard: () => void;
  updateCard: (_id: string, isDone: boolean) => void;
  _id: string;
  title: string;
  description: string;
  is_done: boolean;
  is_important: boolean;
};

export const TaskCard = ({
  onPress,
  deleteCard,
  _id,
  title,
  description,
  is_done,
  is_important,
  updateCard,
}: TaskCardType) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(is_done);
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <View style={{position: 'absolute', left: 5}}>
        {is_important && <Text style={styles.important}>Важная!</Text>}
      </View>
      <View style={{position: 'absolute', right: 5}}>
        <TouchableOpacity onPress={deleteCard}>
          <Ionicons name="delete-circle-outline" size={25} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={event => {
          event.stopPropagation();
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
            updateCard(_id, newValue);
          }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};
