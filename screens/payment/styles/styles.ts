import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  paymentParent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    color: 'black',
    marginTop: 10,
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    width: '100%',
    padding: 12,
  },
  priceInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
