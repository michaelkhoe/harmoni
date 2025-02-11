import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from "@unitools/router";

const InputCustomerDetails = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [salesPIC, setSalesPIC] = React.useState('');

    const handleSubmit = () => {
        router.push("/transaction/details");
        // Handle form submission
        console.log({ name, phoneNumber, address, salesPIC });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter customer name"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
            />

            <Text style={styles.label}>Sales PIC</Text>
            <TextInput
                style={styles.input}
                value={salesPIC}
                onChangeText={setSalesPIC}
                placeholder="Enter sales PIC"
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default InputCustomerDetails;