import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginBottom: 10,
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
