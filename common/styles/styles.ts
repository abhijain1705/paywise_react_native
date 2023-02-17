import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },
  body: {
    padding: 20,
  },
  head: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12
  },
  subHeading: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export const textInputStyles = StyleSheet.create({
  container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
  },
  checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
  },
  label: {
      color: 'black',
  },
  input: {
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 12,
      color: 'black',
      padding: 12
  },
  error: {
      color: 'red'
  },
  passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      position: 'relative',
  },
  passwordInput: {
      flex: 1,
      color: '#333',
  },
  eyeIcon: {
      position: 'absolute',
      top: 30,
      right: 10,
      width: 30,
      height: 30,
  },
})