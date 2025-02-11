import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import ProductTxnCell from "@/app/components/product-txn-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { useRouter } from "@unitools/router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import Styles from "@/constants/Styles";

const data = Array.from({ length: 2 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const horizontalPadding = 16;

const InputProductConfirmationScreen = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState('');
      
    const renderItem = ({ item }) => (
        <View style={[Styles.item]}>
            <ProductTxnCell transaction={item} />
        </View>
    );

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Input Product Confirmation</Text>
            <ScrollView style={{ backgroundColor: white, borderRadius: 4 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    numColumns={1}
                    contentContainerStyle={Styles.itemContainer}
                />
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
                <Button className="w-full" onPress={() => { router.push("/order/input-customer-details"); }} style={{ backgroundColor: white }}>
                    <ButtonText className="font-medium" style={{ color: midnightBlue }}>Input Customer Detail</ButtonText>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomButtonContainer: {
        marginTop: 20,
        paddingBottom: 20,
    },
});

export default InputProductConfirmationScreen;