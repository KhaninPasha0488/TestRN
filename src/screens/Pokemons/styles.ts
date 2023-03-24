import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: '#88c1cb',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginLeft: '10%',
    width: '80%',
    borderRadius: 5,
    borderWidth: 1,
    opacity: 0.8,
  },
  text: {
    fontSize: 40,
    color: '#100f0f',
    fontFamily: 'DeliciousHandrawn-Regular',
  },
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    position: 'relative',
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    fontSize: 20,
    fontFamily: 'DeliciousHandrawn-Regular',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  loadingCard: {
    position: 'absolute',
    bottom: 5,
    left: '45%',
  },
});
