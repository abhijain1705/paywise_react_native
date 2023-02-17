import {StyleSheet} from 'react-native';

export const errorStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E90064',
    paddingBottom: 150,
    paddingTop: 50
  },
  title: {
    fontSize: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: 150,
    height: 50,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: 'black',
    fontWeight: '600',
    fontSize: 17
  },
});
