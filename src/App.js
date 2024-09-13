import './index';
import './App.css';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator()

function App() {

  const [appData, setAppData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8001/api/appData")
    .then(res => res.json())
    .then(appData => console.log(appData))
    .catch(err => console.log(err));
  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User Details" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
