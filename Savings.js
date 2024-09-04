import { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Savings() {
  const [savedSavings, setSavedSavings] = useState('0.00');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const savedSavingsValue = await AsyncStorage.getItem('savings');
        const parsedSavings = savedSavingsValue ? JSON.parse(savedSavingsValue) : 0;
        setSavedSavings(parsedSavings.toFixed(2)); // Format savings to two decimal places
      } catch (error) {
        console.error('Error retrieving savings:', error);
        Alert.alert('Error', 'Unable to retrieve savings data.');
      }
    };

    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentDate(formattedDate);
    };

    fetchSavings();
    getCurrentDate();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.text}>Your current savings as of {currentDate} is</Text>
          <Text style={styles.balance}>PHP {savedSavings}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light background color for better readability
  },
  card: {
    maxWidth: 400,
    minHeight: 180,
    backgroundColor: 'rgb(52, 49, 49)',
    margin: 16,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 0.3 },
    padding: 16,
  },
  content: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  balance: {
    color: 'rgba(255, 199, 23, 1)',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
