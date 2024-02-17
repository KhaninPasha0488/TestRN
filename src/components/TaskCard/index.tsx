import {Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
type TaskCardType = {
  onPress: () => void;
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  is_important: boolean;
};

export const TaskCard = ({
  onPress,
  id,
  title,
  description,
  is_done,
  is_important,
}: TaskCardType) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(is_done);
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <View style={{position: 'absolute', left: 5}}>
        {is_important && <Text style={styles.important}>Важная!</Text>}
      </View>
      <View style={{position: 'absolute', right: 5}}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="delete-circle-outline" size={25} />
        </TouchableOpacity>
      </View>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};
