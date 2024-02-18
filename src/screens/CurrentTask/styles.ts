import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  containerCard: {
    backgroundColor: '#decd8b',
    opacity: 0.8,
    alignItems: 'center',
    maxHeight: 500,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    paddingBottom: 10,
  },
  textId: {
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 10,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  textName: {
    fontSize: 50,
    fontWeight: '500',
    fontFamily: 'DeliciousHandrawn-Regular',
  },
  imege: {
    width: 200,
    height: 200,
  },
  text__form: {
    fontFamily: 'DeliciousHandrawn-Regular',
    fontSize: 12,
    color: '#000000',
    flexWrap: 'wrap',
  },
  textFieldStyle: {
    fontFamily: 'DeliciousHandrawn-Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
    marginTop: 20,
    marginLeft: 15,
    opacity: 1,
    color: '#383535',
  },
  btn: {
    width: '70%',
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#c57171',
    marginTop: 10,
  },
});
