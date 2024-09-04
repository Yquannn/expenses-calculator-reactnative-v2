import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable, ScrollView } from 'react-native';
import styles from './CardStyle.js';  
import Inputstyles from './InputStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card() {
  const formatNumberWithCommas = (number) => {
    if (number == null) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [balance, setBalance] = useState();
  const [allowance, setAllowance] = useState();
  const [expenses, setExpenses] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [list, setList] = useState([]);
  const [savings, setSavings] = useState();

  // const [listOfExpenses, setListOfExpenses] = useState([]);
  const [userAllowanceInput, setUserAllowanceInput] = useState('');
  const [userExpensesInput, setUserExpensesInput] = useState('');
  const [expenseDetail, setExpenseDetail] = useState('');

  const parsedAllowance = parseFloat(userAllowanceInput.replace(/,/g, '')) || 0;
  const parsedExpenses = parseFloat(userExpensesInput.replace(/,/g, '')) || 0;

  const handleDeposit = async () => {
    try {
      console.log('Current balance:', balance);
      
      const savedSavings = await AsyncStorage.getItem('savings');
      const parsedSavings = savedSavings ? JSON.parse(savedSavings) : 0;
      
      const totalSaving = (parsedSavings || 0) + (balance || 0);
      
      await AsyncStorage.setItem('savings', JSON.stringify(totalSaving));
      
      setSavings(totalSaving);
      
      console.log('Total savings:', totalSaving);
      handleClear()
      Alert.alert('Deposit successfully')
    } catch (error) {
      console.error('Error updating savings:', error);
    }
  };
  
  

  const handleSave = async () => {
    try {
      if (userExpensesInput.length === 0) {
        Alert.alert('Please input your expenses');
        return;
      }
      console.log('my expenses',parsedExpenses)
      const updatedList = [...list, [expenseDetail, parsedExpenses]];
      setList(updatedList);
      
  

      await AsyncStorage.setItem('allowance', JSON.stringify(parsedAllowance));
      await AsyncStorage.setItem('expenses', JSON.stringify(parsedExpenses));
      await AsyncStorage.setItem('list', JSON.stringify(updatedList)); 

      loadAllowanceAndExpenses();

      Alert.alert('Saved');
      setUserExpensesInput('');
      setExpenseDetail(''); 
      toggleDisable();

    } catch (error) {
      console.error('Error setting item:', error);
    }
  };

  const loadAllowanceAndExpenses = async () => {
    try {
      const getAllowance = await AsyncStorage.getItem('allowance');
      const getExpenses = await AsyncStorage.getItem('expenses');
      const getList = await AsyncStorage.getItem('list'); 
      
      // const getListOfExpenses = await AsyncStorage.getItem('listOfExpenses'); 


      let allowanceValue = 0;
      let previousExpenses = 0;

      if (getAllowance !== null) {
        allowanceValue = parseInt(JSON.parse(getAllowance), 10);
        setAllowance(allowanceValue);
      }

      if (getExpenses !== null) {
        previousExpenses = parseInt(JSON.parse(getExpenses), 10);
      }

      const currentExpenses = parseInt(expenses, 10) || 0;
      const totalExpenses = previousExpenses + currentExpenses;

      await AsyncStorage.setItem('expenses', JSON.stringify(totalExpenses));
      setExpenses(totalExpenses);

      if (totalExpenses > allowanceValue) {
        Alert.alert('Your expenses exceed your budget. The exceed limit deducted to your savings');
      }

      const calculatedBalance = allowanceValue - totalExpenses;
      await AsyncStorage.setItem('balance', JSON.stringify(calculatedBalance));
      setBalance(calculatedBalance);

      // Load and set the list
      if (getList !== null) {
        setList(JSON.parse(getList));
      }
      
      // if(getListOfExpenses !== null){
      //   setListOfExpenses(JSON.parse(getListOfExpenses))
      // }

    } catch (error) {
      console.error('Error retrieving item:', error);
    }
  };

  const toggleDisable = () => {
    setIsDisabled(prevState => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAllowanceInput.length === 0) {
          const getAllowance = await AsyncStorage.getItem('allowance');
          if (getAllowance !== null) {
            setUserAllowanceInput(getAllowance);
            toggleDisable();
          }
        }
        const savedSavings = await AsyncStorage.getItem('savings');
        const parsedSavings = savedSavings ? JSON.parse(savedSavings) : 0;
        setSavings(parsedSavings);
        loadAllowanceAndExpenses();
      } catch (error) {
        console.error('Error retrieving allowance:', error);
      }
    };


    fetchData();
  }, [userAllowanceInput]);

  const displayBalance = formatNumberWithCommas(balance) + '.00';

  const handleClear = async () => {
    try {
      // Clear specific keys from AsyncStorage
      await AsyncStorage.removeItem('allowance');
      await AsyncStorage.removeItem('balance');
      await AsyncStorage.removeItem('expenses');
      await AsyncStorage.removeItem('list');
      
      // Reset state variables
      setBalance(0);
      setAllowance(0);
      setExpenses(0);
      setUserAllowanceInput('');
      setUserExpensesInput('');
      setList([]);
  
      // Enable inputs again
      setIsDisabled(false);
  
      // Notify user
      Alert.alert('Cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  

  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <Text style={styles.balanceLbl}>Available Budget</Text>
            <Text style={styles.balanceLbl}>Savings</Text>

          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceCurrency}>PHP <Text style={styles.balance}>{displayBalance}</Text></Text>
            <Text style={styles.ExpensesCurrency}>PHP <Text style={styles.Expensesbalance}>{formatNumberWithCommas(savings) + '.00'}</Text></Text>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.headerContainer}>
            <Text style={styles.balanceLbl}>Daily/Weekly Budget</Text>
            <Text style={styles.balanceLbl}>Expenses</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceCurrency}>PHP <Text style={styles.balance}>{formatNumberWithCommas(allowance) + '.00'}</Text></Text>
            <Text style={styles.ExpensesCurrency}>PHP <Text style={styles.Expensesbalance}>{formatNumberWithCommas(expenses) + '.00'}</Text></Text>
          </View>
        </View>

        <View style={Inputstyles.inputContainer}>
          <View style={Inputstyles.dailyAllowanceContainer}>
            <Text style={Inputstyles.textLabel}>Daily/Weekly Budget</Text>
            <TextInput 
              style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
              placeholder='Enter your allowance'
              value={userAllowanceInput}
              onChangeText={setUserAllowanceInput}
              keyboardType="numeric"
              editable={!isDisabled}
            />
            <Text style={Inputstyles.textLabel}>Daily Expenses</Text>
            <TextInput 
              style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
              placeholder='Enter your expenses'
              value={userExpensesInput}
              onChangeText={setUserExpensesInput}
              keyboardType="numeric"
            />
            <Text style={Inputstyles.textLabel}>
              Note <Text style={Inputstyles.optional}>(Optional)</Text>
            </Text>
            <TextInput 
              style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
              placeholder='Notes...'
              value={expenseDetail}
              onChangeText={setExpenseDetail} // Update the expense detail input
            />
            <View>
              <View style={Inputstyles.btnContainer}>
                <Pressable onPress={handleSave} style={Inputstyles.saveBtn}>
                  <Text style={Inputstyles.text}>Save</Text>
                </Pressable>       
                <Pressable style={Inputstyles.clearBtn} onPress={handleClear}>
                  <Text style={Inputstyles.text}>Clear</Text>
                </Pressable>  
              </View>
              <Pressable style={Inputstyles.deposit} onPress={handleDeposit}>
                  <Text style={Inputstyles.text}>Deposit</Text>
                </Pressable>  
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
