import { StyleSheet,View, Text, Button } from 'react-native';
import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';

const Settings = () => {
  const user = auth().currentUser;

  return (
    <View style={{ flex: 1 }}>
        <Text>Welcome {user?.email}!</Text>
        <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})