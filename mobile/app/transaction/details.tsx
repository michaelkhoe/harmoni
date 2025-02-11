import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ProductTxnCell from '@/app/components/product-txn-cell';
import { midnightBlue, white } from "@/constants/Colors";

interface TransactionDetailsProps {
    id: string;
    amount: number;
    date: string;
    description: string;
}

const data = Array.from({ length: 5 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ }) => {
    const id = '1';
    const amount = "Rp. 100.000.000";
    const date = '2021-09-01';
    const customerName = 'MIKE';
    const customerAddress = 'Jl. Raya Kebayoran Lama No. 12';
    const customerPhoneNumber = '081234567890';
    const salesPic = 'JANE';

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <ProductTxnCell title={item.title} />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Transaction {id}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={1}
                contentContainerStyle={styles.itemContainer}
            />

            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.value}>{amount}</Text>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{date}</Text>

            <Text style={styles.label}>Customer Name:</Text>
            <Text style={styles.value}>{customerName}</Text>
            <Text style={styles.label}>Customer PhineNumber:</Text>
            <Text style={styles.value}>{customerPhoneNumber}</Text>
            <Text style={styles.label}>Customer Address:</Text>
            <Text style={styles.value}>{customerAddress}</Text>
            <Text style={styles.label}>Sales Pic:</Text>
            <Text style={styles.value}>{salesPic}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemContainer: {    
        flexGrow: 1
    },
    value: {
        marginBottom: 10,
    },
});

export default TransactionDetails;