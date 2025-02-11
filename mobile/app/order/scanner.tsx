import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';

const Scanner = () => {
    // const [qrCode, setQrCode] = useState('');
    // const devices = useCameraDevices();
    // const device = devices.back;

    // const handleBarCodeRead = ({ data }: { data: string }) => {
    //     setQrCode(data);
    // };

        // {device != null && (
        //     <Camera
        //         style={styles.camera}
        //         device={device}
        //         isActive={true}
        //         onCodesScanned={handleBarCodeRead}
        //         captureAudio={false}
        //     >
        //         <View style={styles.qrCodeContainer}>
        //             <Text style={styles.qrCodeText}>{qrCode ? `QR Code: ${qrCode}` : 'Scan a QR Code'}</Text>
        //         </View>
        //     </Camera>
        // )}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    qrCodeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    qrCodeText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Scanner;