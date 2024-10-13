import { View, Text, Button } from 'react-native';
import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Settings from './Settings';
import Qr_code from './Qr_code';
import Rewards from './Rewards';


const Tab = createBottomTabNavigator();

const Page = () => {
  const user = auth().currentUser;

  return (
    <View style={{ flex: 1 }}>
        <Text>Welcome {user?.email}!</Text>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Qrcode" component={Qr_code} />
        <Tab.Screen name="Rewards" component={Rewards} />
      </Tab.Navigator>
    </View>
  );
};

export default Page;