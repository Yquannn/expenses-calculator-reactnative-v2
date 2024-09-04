import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './MainContent';
import Details from './Details'
import Savings from './Savings'
import { SafeAreaView } from 'react-native';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Home/>
  </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Details/>
    </SafeAreaView>
  );
}

function SavingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Savings/>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Details') {
              iconName = 'list-outline';
            } else if (route.name === 'Savings') {
              iconName = 'wallet-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Savings" component={SavingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
