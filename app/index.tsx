import { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';

enableExperimentalWebImplementation(true);

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Check your emails for confirmation!');
    } catch (e: any) {
      const err = e as Error; // Use generic Error class
      alert('Registration Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('Sign In Successful!');
    } catch (e: any) {
      const err = e as Error;
      alert('Sign In Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email/Username"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />
          {loading ? (
            <ActivityIndicator size="small" style={{ margin: 28 }} />
          ) : (
            <>
              <Button onPress={signIn} title="Sign In" />
              <Button onPress={signUp} title="Sign Up" />
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
