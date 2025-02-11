import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TextInput, Platform } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import ProductCell from "@/app/components/product-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/icon"
import Styles from "@/constants/Styles";

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
            <Text style={Styles.title}>Product List</Text>
            <Input style={Styles.searchBar}>
                <InputSlot className="pl-3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Search..." style={{ color: white }}/>
            </Input>
            <View style={{ backgroundColor: white }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    numColumns={numColumns}
                    contentContainerStyle={styles.itemContainer}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: horizontalPadding,
        backgroundColor: midnightBlue,
    },
    itemContainer: {    
        flexGrow: 1,
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