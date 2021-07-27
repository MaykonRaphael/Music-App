import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#282828',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
      paddingHorizontal: 20
  }
});