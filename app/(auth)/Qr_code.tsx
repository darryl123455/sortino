import { AppState, Linking, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { CameraView } from 'expo-camera'
import { Overlay } from './Overlay'

const Qr_code = () => {

    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if(
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                qrLock.current = false;
            }
            appState.current = nextAppState
        })

        return () => {
            subscription.remove();
        };
    }, [])

  return (
    <SafeAreaView style = {StyleSheet.absoluteFillObject}>
        {Platform.OS === "android" ? <StatusBar hidden /> : null} 
    <CameraView
    style = {StyleSheet.absoluteFillObject}
    facing="back"
    onBarcodeScanned={({data}) => {
        if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
                await Linking.openURL(data);
            }, 500);
        } 
    }}
    />
    <Overlay />
    </SafeAreaView>
  )
}


export default Qr_code

const styles = StyleSheet.create({})