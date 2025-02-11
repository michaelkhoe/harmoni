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

const TransactionCell: React.FC<TransactionCellProps> = ({ }) => {
    const date = '2021-09-01';
    const products: Product[] = [
        {
          id: 1,
          name: 'Sample Product 1'
        },
        {
          id: 2,
          name: 'Sample Product 2'
        },
        {
          id: 3,
          name: 'Sample Product 3'
        }
    ];
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.sectionTitle}>Sales PIC</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.sectionTitle}>Products</Text>
                <Text style={styles.sectionTitle}>Customer Name</Text>
            </View>
            {products?.slice(0, 3).map(product => (
                <Text key={product.id} style={styles.product}>
                    {product.name}
                </Text>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.sectionTitle}>Total Price</Text>
                <Text style={styles.sectionTitle}>Rp. 10.000.000</Text>
            </View>
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

export default TransactionCell;