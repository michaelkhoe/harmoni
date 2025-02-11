import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { ScrollView } from "@/components/ui/scroll-view";
import TransactionCell from "@/app/components/transaction-cell";
import { midnightBlue, white } from "@/constants/Colors";
import { useRouter } from "@unitools/router";

const data = Array.from({ length: 20 }, (_, i) => ({ key: `${i}`, title: `Item ${i + 1}` }));

const horizontalPadding = 16;

const HistoryScreen = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };
      
    const renderItem = ({ item }) => (
        <View style={[styles.item]}>
            <TouchableOpacity onPress={() => { router.push("/product") }}>
                <TransactionCell transaction={item} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Transaction History</Text>
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
                numColumns={1}
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
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});

export default HistoryScreen;