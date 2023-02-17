import {calculateResultFromCalculatorAPI} from '../api/api';

interface handleInputProp {
  number: string;
  type: string;
  input: string;
  setnumber: React.Dispatch<React.SetStateAction<string>>;
  callingSnackBar: (type: string, mesage: string) => void;
}

export const handleInput = ({
  number,
  type,
  input,
  setnumber,
  callingSnackBar
}: handleInputProp) => {
  let operatorIndex = -1;
  let operatorCount = 0;
  let num1;
  let num2;
  // preventing operator at beginning
  if (number.length == 0 && type == 'operator') {
    callingSnackBar("error", "you can't add operator in the beginning");
    return false;
  }
  operatorIndex = findOperatorIndex(number);
  let temporaryString = number + input;
  for (let i = 0; i < temporaryString.length; i++) {
    if (['+', '-', '*'].includes(temporaryString[i])) {
      operatorCount++;
    }

    if (operatorCount > 1) {
      callingSnackBar("error", "you can't have more than one operator.");
      return false;
    }
  }
  // if last character is not operator that means all chars in string are numbers
  if (operatorIndex != number.length - 1 && operatorIndex === -1) {
    num1 = parseInt(number) + parseInt(input!);
    if (num1 > 100000000) {
      callingSnackBar("error", "calculator have maximum capacity of 10 crore.");
      return false;
    }
  }
  // preventing two operator come after each other.
  if (operatorIndex == number.length - 1 && type == 'operator') {
    callingSnackBar("error", "you can't have two operator right after each other.");
    return false;
  }
  if (operatorIndex != number.length - 1 && operatorIndex !== -1) {
    num2 = parseInt(number.substring(operatorIndex)) + parseInt(input!);
    if (num2 > 100000000) {
      callingSnackBar("error", "calculator have maximum capacity of 10 crore.");
      return false;
    }
  }

  setnumber(prev => prev + input);
};

function findOperatorIndex(str: string) {
  const operators = ['+', '-', '*', '/'];
  for (let i = 0; i < str.length; i++) {
    if (operators.includes(str[i])) {
      return i;
    }
  }
  return -1;
}

function isOperator(char: string) {
  const operators = ['+', '-', '*', '/'];
  return operators.includes(char);
}

interface ClearInputProp {
  setnumber: React.Dispatch<React.SetStateAction<string>>;
}

export const cleanInput = ({setnumber}: ClearInputProp) => {
  setnumber('');
};

interface calculateResultProp {
  setnumber: React.Dispatch<React.SetStateAction<string>>;
  setloading: React.Dispatch<React.SetStateAction<boolean>>;
  callingSnackBar: (type: string, mesage: string) => void;
  number: string;
}

export const result = async ({
  setloading,
  setnumber,
  number,
  callingSnackBar,
}: calculateResultProp) => {
  setloading(true);
  let ans = await calculateResult(number, callingSnackBar);
  setloading(false);
  setnumber(ans!);
};

async function calculateResult(
  input: string,
  callingSnackBar: (type: string, mesage: string) => void,
) {
  if (isOperator(input[input.length - 1])) {
    return '';
  }
  const operatorIndex = input.search(/[-+*/]/);

  let num1 = 0;
  num1 = parseInt(input.slice(0, operatorIndex));
  let num2 = 0;
  num2 = parseInt(input.slice(operatorIndex + 1));

  let result = '';
  try {
    result = await calculateResultFromCalculatorAPI(
      num1,
      num2,
      input[operatorIndex],
    );
  } catch (error) {
    result = '';
    callingSnackBar('error', 'error occured, try again later');
  }
  return result;
}
