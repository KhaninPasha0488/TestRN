import React from 'react';
import {
  TextInput,
  Text,
  TextStyle,
  StyleProp,
  View,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface IProps {
  textStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  error?: boolean;
  title?: string;
  errorText?: string;
  isPhone?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
}

const FormField: React.FC<IProps & TextInputProps> = ({
  textStyle,
  error,
  title,
  errorText,
  inputStyle,
  titleStyle,
  editable = true,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
      <TextInput
        {...props}
        multiline
        style={[styles.input, inputStyle]}
        editable={editable}
        placeholderTextColor="#8C92A8"
        disableFullscreenUI={true}
      />
      {error && errorText ? (
        <Text style={[styles.errorText, textStyle]}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    width: '100%',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 10,
    opacity: 0.64,
    color: '#4F0F90',
  },
  text: {fontSize: 12},
  errorText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: 'red',
  },
  input: {
    borderRadius: 21,
    paddingLeft: 16,
    minHeight: 58,
    maxHeight: 120,
    alignItems: 'center',
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#090C18',
    backgroundColor: '#FFFFFF',
  },
  errorInput: {
    borderBottomColor: 'red',
  },
});

export default React.memo(FormField);
