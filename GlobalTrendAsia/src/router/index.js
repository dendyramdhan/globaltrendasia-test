import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Success, Failed} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Failed"
        component={Failed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
