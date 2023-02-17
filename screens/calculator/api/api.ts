import axios from 'axios';
import {API_URL} from '@env';

export async function calculateResultFromCalculatorAPI(
  num1: number,
  num2: number,
  operator: string,
) {
  try {
    const response = await axios.post(process.env.API_URL!, {
      num1: num1,
      num2: num2,
      operator: operator,
    });
    return response.data;
  } catch (error) {
    throw new Error('error occured, try again later');
  }
}
