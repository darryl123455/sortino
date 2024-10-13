import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if(initializing) return;

    const inAuthGroup = segments["0"] === '(auth)';

    if (user && !inAuthGroup) {
      router.replace('/(auth)/home')
    } else if (!user && inAuthGroup){
      router.replace('/')
    }

  }, [user, initializing]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}
