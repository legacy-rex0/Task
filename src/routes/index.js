import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/main';
import info from '../screens/info';


const MainStack = createStackNavigator();
const MainStackScreem = () => {
    return(
        <MainStack.Navigator headerMode="none">
            <MainStack.Screen name='mainScreen' component={Main} />
            <MainStack.Screen name='infoScreen' component={info} />
        </MainStack.Navigator>
    )
}

export default function Index() {
  return (
    <NavigationContainer>
        <MainStackScreem/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
