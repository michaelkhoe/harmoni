import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { useRouter } from "@unitools/router";
import { midnightBlue, white } from "@/constants/Colors";
import TransactionCell from "@/app/components/transaction-cell";


const HomeScreen = () => {
    const router = useRouter();
    const transactions = [
        { id: '1', title: 'Transaction 1' },
        { id: '2', title: 'Transaction 2' },
        { id: '3', title: 'Transaction 3' },
        { id: '4', title: 'Transaction 4' },
        { id: '5', title: 'Transaction 5' },
    ];

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <Text>{item.title}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardContainer}>
                <Text style={styles.sectionTitle}>Product List</Text>
                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => { router.push("/product"); }}>
                        <View style={styles.iconContainer}>
                            <Text>📱</Text>
                        </View>
                        <Text>Electronic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => { router.push("/product"); }}>
                        <View style={styles.iconContainer}>
                            <Text>📱</Text>
                        </View>
                        <Text>Furniture</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.menuBtnItem} onPress={() => { router.push("/product"); }}>
                    <Text>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.transactionSection}>
                    <Text style={styles.sectionTitle}>Transaction History</Text>
                    <TouchableOpacity onPress={() => { router.push("/transaction/history"); }}>
                        <FlatList
                            data={transactions.slice(0, 3)}
                            renderItem={({ item }) => <TransactionCell transaction={item} />}
                            keyExtractor={item => item.id}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.sectionTitle}>Make an Order</Text>
                <Button className="w-full" onPress={() => { router.push("/order/input-details"); }} style={{ backgroundColor: midnightBlue }}>
                    <ButtonText className="font-medium" style={{ color: white }}>Make Order</ButtonText>
                </Button>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: midnightBlue,
    },
    cardContainer: {
        backgroundColor: white,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    menuSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        height: 88,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 8,
        borderRadius: 8
    },
    menuBtnItem: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 8,
        borderRadius: 8,
    },
    transactionSection: {
        flex: 1,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 16,
        color: '#fff',
        marginLeft: -8,
    },
    transactionItem: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    orderButtonSection: {
        marginTop: 16,
    },
});

export default HomeScreen;