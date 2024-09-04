import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { loadData } from './LoadData'; 

export default function Details() {
  const [allowance, setAllowance] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [balance, setBalance] = useState(null);
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const data = await loadData();
    if (data) {
      setAllowance(data.allowance);
      setExpenses(data.expenses);
      setBalance(data.balance);
      setList(data.list);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <View style={styles.container}>

      {allowance !== null && (
        <Text style={styles.dataContainer}>
          Allowance: {allowance} Expenses: {expenses} Balance: {balance}
        </Text>
      )}
      <Text style={styles.listLabel}>List of Expenses</Text>
      {list.length > 0 ? (
        <FlatList
          style={styles.itemContainer}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.detailsLabel} key={index}>
              Details: <Text style={styles.item}>{item[0]}</Text>
              {'\n'}Expense: <Text style={styles.item}>{item[1]}</Text>
            </Text>
          )}
        />
        
      ) : (
        <Text style={styles.noItemsText}>No expenses to display.</Text>
      )}
      <Pressable onPress={fetchData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(255, 199, 23, 1)',
    marginBottom: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  listLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataContainer: {
    fontSize: 15,
    margin: 12,
  },
  detailsLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    margin: 10,
  },
  item: {
    color: 'rgba(255, 199, 23, 1)',
    fontSize: 16,
  },
  noItemsText: {
    fontSize: 14,
    color: 'gray',
  },
});
