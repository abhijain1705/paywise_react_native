import { Text, View, FlatList } from 'react-native';
import { calculatorStyles } from './styles/style';
import React, { useState } from 'react';
import ButtonComponent from './components/button';
import SnackbarComponent from '../../common/components/snackbar';
import Indicator from '../../common/components/indicator';

const Calculator = () => {
  const [number, setnumber] = useState('');
  const [loading, setloading] = useState(false);
  const [snackBarVisible, setsnackBarVisible] = useState(false);
  const [snackBarMessage, setsnackBarMessage] = useState('ergaegaeg');
  const [snackBarMessageType, setsnackBarMessageType] = useState('error');

  const data = [
    {
      type: 'number',
      value: '1',
    },
    {
      type: 'number',
      value: '2',
    },
    {
      type: 'number',
      value: '3',
    },
    {
      type: 'number',
      value: '4',
    },
    {
      type: 'number',
      value: '5',
    },
    {
      type: 'number',
      value: '6',
    },
    {
      type: 'number',
      value: '7',
    },
    {
      type: 'number',
      value: '8',
    },
    {
      type: 'number',
      value: '9',
    },
    {
      type: 'number',
      value: '0',
    },
    {
      type: 'operator',
      value: '-',
    },
    {
      type: 'operator',
      value: '+',
    },
    {
      type: 'operator',
      value: '*',
    },
    {
      type: 'clean',
      value: 'C',
    },
    {
      type: 'result',
      value: 'ANS',
    },
  ];

  return (
    <View style={calculatorStyles.parent}>
      <View style={calculatorStyles.parent}>
        <View style={calculatorStyles.valueWrapper}>
          {loading ? <Indicator /> : <Text style={calculatorStyles.value}>{number}</Text>}
        </View>
        <View style={calculatorStyles.wrapper}>
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({ item }) => (
              <ButtonComponent
                callingSnackBar={(type: string, message: string) => {
                  setsnackBarMessage(message);
                  setsnackBarMessageType(type);
                  setsnackBarVisible(true);
                }}
                setloading={setloading}
                number={number}
                setnumber={setnumber}
                value={item?.value}
                type={item?.type}
              />
            )}
            keyExtractor={item => item?.value!}
          />
        </View>
      </View>
      <SnackbarComponent
        message={snackBarMessage}
        type={snackBarMessageType}
        close={() => {
          setsnackBarVisible(false);
        }}
        visible={snackBarVisible}
      />
    </View>
  );
};

export default Calculator;
