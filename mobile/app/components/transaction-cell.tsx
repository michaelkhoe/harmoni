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
        },
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
            {products?.map(product => (
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
        backgroundColor: '#ffffff',
        padding: 8,
        borderWidth: 0.1,
        borderColor: '#fafafa',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 8,
        margin: 4
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