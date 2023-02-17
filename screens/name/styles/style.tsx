import { StyleSheet } from 'react-native';

export const nameStyles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 12,
    color: 'black',
    padding: 12
  },
  save: {
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 12,
    marginTop: 20
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  parent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  }
});