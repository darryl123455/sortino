import { View, Text, Button } from 'react-native';
import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Settings from './Settings';
import Rewards from './Rewards';
import Qr_code_permission from './Qr_code_permission';


const Tab = createBottomTabNavigator();

const Page = () => {
  const user = auth().currentUser;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Qrcode" component={Qr_code_permission} />
        <Tab.Screen name="Rewards" component={Rewards} />
      </Tab.Navigator>
    </View>
  );
};

export default Page;