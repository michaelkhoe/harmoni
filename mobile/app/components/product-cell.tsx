import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProductCellProps {
    imageUrl: string;
    name: string;
    quantity: number;
    price: number;
}

const ProductCell: React.FC<ProductCellProps> = ({ }) => {
    const imageUrl = 'https://placehold.co/400';
    const name = 'Sample Product';
    const quantity = 10;
    const price = "Rp. 1.000.000";
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.quantity}>Quantity: {quantity}</Text>
            <Text style={styles.price}>{price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default ProductCell;