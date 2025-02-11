import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ProductTxnCell from '@/app/components/product-txn-cell';
import { midnightBlue, white } from "@/constants/Colors";
import Styles from "@/constants/Styles";

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
    const date = '08/02/2025 14:30:25';
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
        <ScrollView style={Styles.container}>
            <Text style={Styles.title}>Transaction Details</Text>
            <View style={{ backgroundColor: white, padding: 8, borderRadius: 4 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    numColumns={1}
                    contentContainerStyle={styles.itemContainer}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginTop: 8 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Total Price</Text>
                        <Text style={styles.value}>{amount}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Transaction Date</Text>
                        <Text style={styles.value}>{date}</Text>
                    </View>
                </View>

                <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, marginVertical: 16 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Customer Name</Text>
                        <Text style={styles.value}>{customerName}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Customer Phone Number</Text>
                        <Text style={styles.value}>{customerPhoneNumber}</Text>
                    </View>
                </View>
                
                <Text style={styles.label}>Customer Address:</Text>
                <Text style={styles.value}>{customerAddress}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.label}>Sales Pic:</Text>
                    <Text style={styles.value}>{salesPic}</Text>
                </View>  
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 4
    },
    itemContainer: {    
        flexGrow: 1
    },
    value: {
        marginTop: 10
    },
});

export default TransactionDetails;