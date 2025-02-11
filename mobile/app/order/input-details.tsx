import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import ProductInputCell from "@/app/components/product-input-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { useRouter } from "@unitools/router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import Styles from "@/constants/Styles";

const data = Array.from({ length: 2 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const horizontalPadding = 16;

const InputDetailsScreen = () => {
    const router = useRouter();
      
    const renderItem = ({ item }) => (
        <View style={[styles.item]}>
            <ProductInputCell transaction={item} />
        </View>
    );

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Input Details - Product Confirmation</Text>
            <ScrollView style={{ backgroundColor: white, borderRadius: 4 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    numColumns={1}
                    contentContainerStyle={styles.itemContainer}
                />
                <Button onPress={() => { }} style={{ backgroundColor: midnightBlue, marginHorizontal: 8 }}>
                    <ButtonText className="font-medium" style={{ color: white }}>Add More Product</ButtonText>
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
        marginTop: 20,
        paddingBottom: 20,
    },
});

export default InputDetailsScreen;