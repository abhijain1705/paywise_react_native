import {StyleSheet} from 'react-native';

export const notificationStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 12,
    height: 200,
    width: 200,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },
});
