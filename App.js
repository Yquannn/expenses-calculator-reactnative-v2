import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './NavBar'; // Import NavBar, which is the bottom tab navigator
import HomeScreen from './HomePage';

export default function App() {
  return (
    <HomeScreen/>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    justifyContent: "center", 
    alignItems: "center"
  },
});
