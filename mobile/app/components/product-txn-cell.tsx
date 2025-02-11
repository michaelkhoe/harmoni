import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Product {
    id: number;
    name: string;
}

interface TransactionCellProps {
    date: string;
    products: Product[];
}

const ProductTxnCell: React.FC<TransactionCellProps> = ({  }) => {
    const qty = 10;
    const productName = 'Product Name';
    const price = 1000;
    const sellingPrice = 1200;
    const total = qty * price;
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.date}>{productName}</Text>
                <Text style={styles.sectionTitle}>x{qty}</Text>
            </View>
            <Text>Base Price: {price}</Text>
            <Text>Sell Price: {sellingPrice}</Text>
            <Text>Total Price: Rp.{total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    product: {
        fontSize: 14,
        marginBottom: 2,
    },
});

export default ProductTxnCell;