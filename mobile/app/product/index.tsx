import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TextInput } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { ScrollView } from "@/components/ui/scroll-view";
import ProductCell from "@/app/components/product-cell";
import { midnightBlue, white } from "@/constants/Colors";

const { width } = Dimensions.get('window');

const data = Array.from({ length: 20 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const horizontalPadding = 16;
const numColumns = 2;
const itemWidth = (width - (horizontalPadding * 3)) / numColumns;

const ProductScreen = () => {
    const [search, setSearch] = React.useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };
      
    const renderItem = ({ item }) => (
        <View style={[styles.item, { width: itemWidth }]}>
            <ProductCell title={item.title} />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                platform='ios'
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={numColumns}
                contentContainerStyle={styles.itemContainer}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: horizontalPadding,
        backgroundColor: midnightBlue,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: white,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: white,
    },
    itemContainer: {    
        flexGrow: 1
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});

export default ProductScreen;