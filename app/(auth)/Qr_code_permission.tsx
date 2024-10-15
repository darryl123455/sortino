import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import Qr_code from './Qr_code';

const Qr_code_permission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View>
      <Pressable onPress={requestPermission}>
        <Text>Request Permissions</Text>
      </Pressable>
      {/* Only show the Link when permission is granted */}
      {isPermissionGranted ? (
        <Link href={"/(auth)/Qr_code"} asChild>
          <Pressable>
            <Text>Scan Code</Text>
          </Pressable>
        </Link>
      ) : (
        <Pressable disabled={true}>
          <Text style={{ opacity: 0.5 }}>Scan Code (Permission Required)</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Qr_code_permission;

const styles = StyleSheet.create({});

