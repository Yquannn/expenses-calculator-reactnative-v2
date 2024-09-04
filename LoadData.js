import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadData() {
  try {
    const getAllowance = await AsyncStorage.getItem('allowance');
    const getExpenses = await AsyncStorage.getItem('expenses');
    const getBalance = await AsyncStorage.getItem('balance');
    const getList = await AsyncStorage.getItem('list');

    return {
      allowance: getAllowance ? JSON.parse(getAllowance) : null,
      expenses: getExpenses ? JSON.parse(getExpenses) : null,
      balance: getBalance ? JSON.parse(getBalance) : null,
      list: getList ? JSON.parse(getList) : [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
