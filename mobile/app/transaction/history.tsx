import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import TransactionCell from "@/app/components/transaction-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { useRouter } from "@unitools/router";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/icon"
import Styles from "@/constants/Styles";

const data = Array.from({ length: 20 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));


const HistoryScreen = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };
      
    const renderItem = ({ item }) => (
        <View style={[styles.item]}>
            <TouchableOpacity onPress={() => { router.push("/transaction/details") }}>
                <TransactionCell transaction={item} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={Styles.container}>
            <Text style={Styles.title}>Transaction History</Text>
            <Input style={Styles.searchBar}>
                <InputSlot className="pl-3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Search..." style={{ color: white }}/>
            </Input>
            <FlatList style={{ backgroundColor: midnightBlue}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={1}
                contentContainerStyle={styles.itemContainer}
            />
        </ScrollView>
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
});

export default HistoryScreen;