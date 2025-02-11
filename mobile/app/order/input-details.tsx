import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import ProductInputCell from "@/app/components/product-input-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { useRouter } from "@unitools/router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";

const data = Array.from({ length: 2 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const horizontalPadding = 16;

const InputDetailsScreen = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };
      
    const renderItem = ({ item }) => (
        <View style={[styles.item]}>
            <ProductInputCell transaction={item} />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Input Details - Product Confirmation</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    numColumns={1}
                    contentContainerStyle={styles.itemContainer}
                />
                <Button className="w-full" onPress={() => { router.push("/order/input-details"); }} style={{ backgroundColor: white }}>
                    <ButtonText className="font-medium" style={{ color: midnightBlue }}>Add More Product</ButtonText>
                </Button>
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
                <Button className="w-full" onPress={() => { router.push("/order/input-product-confirmation"); }} style={{ backgroundColor: white }}>
                    <ButtonText className="font-medium" style={{ color: midnightBlue }}>Input Product Confirmation</ButtonText>
                </Button>
            </View>
        </View>
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
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    bottomButtonContainer: {
        paddingBottom: 20,
    },
});

export default InputDetailsScreen;