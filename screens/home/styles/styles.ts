import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  text: {
    color: 'black',
  },
  top: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottom: {
    backgroundColor: 'white',
  },
  debitCreditParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
