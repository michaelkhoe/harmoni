import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputSpinner from "react-native-input-spinner";

interface Product {
    id: number;
    name: string;
}

interface TransactionCellProps {
    date: string;
    products: Product[];
}

const ProductInputCell: React.FC<TransactionCellProps> = ({  }) => {
    const qty = 10;
    const productName = 'Product Name';
    const price = 1000;
    const sellingPrice = 1200;
    const total = qty * price;
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.date}>{productName}</Text>
                <InputSpinner
                    max={100}
                    min={1}
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    value={1}
                    onChange={(num) => {
                        console.log(num);
                    }}
                    skin="modern"
                    style={styles.spinner}
                />
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
    spinner: {
		flex: 1,
		marginRight: 10,
		minWidth: 150,
        transform: [{ scale: 0.5 }],
	},
    product: {
        fontSize: 14,
        marginBottom: 2,
    },
});

export default ProductInputCell;