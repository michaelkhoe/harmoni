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
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.productName}>{productName}</Text>
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
            <Text style={styles.detailsText} >Base Price: {formatRupiah(price)}</Text>
            <Text style={styles.detailsText} >Sell Price: {formatRupiah(sellingPrice)}</Text>
            <Text style={styles.detailsText} >Total Price: {formatRupiah(total)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    spinner: {
		flex: 1,
		minWidth: 150,
        transform: [{ scale: 0.5 }],
        marginRight: -40,
        marginTop: -15,
	},
    detailsText: {
        fontSize: 12,
        fontWeight: 'medium'
    },
});

export default ProductInputCell;