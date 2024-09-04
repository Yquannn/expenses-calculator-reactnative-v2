
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Card from './Card.js';
import NavBar from './NavBar.js'

export default function App() {

  return (
    <>
       <NavBar/>
    </>

  );
}

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Feed' component={HomeScreen}/>
   </Stack.Navigator>
  )
  

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#e5e5e5",
      justifyContent: "center", 
      alignItems: "center"
    },
});
