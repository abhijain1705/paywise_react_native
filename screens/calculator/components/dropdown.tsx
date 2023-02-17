import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface DropdownProp {
  operator: string;
  setselectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ operator, setselectedOption }: DropdownProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={operator}
          onValueChange={(pickedOperator: string) =>
            setselectedOption(pickedOperator)
          }
          style={styles.picker}
          itemStyle={styles.item}
        >
          <Picker.Item label="subtraction (-)" value="-" />
          <Picker.Item label="addition (+)" value="+" />
          <Picker.Item label="multiplication (*)" value="*" />
        </Picker>
      </View>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 100
  },
  pickerContainer: {
    width: '100%',
    height: 50,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  item: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});
