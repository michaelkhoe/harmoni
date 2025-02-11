import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from "@/components/ui/image";
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
                        <View style={{ alignItems: 'center' }}>
                            <Image 
                                source={require('@/assets/images/electronic-icon.png')} 
                                style={{ width: 24, height: 24 }}
                                resizeMode='contain'
                                size='xs'/>
                            <Text style={{ padding:8, fontWeight:'bold' }}>Electronic</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => { router.push("/product"); }}>
                        <Image 
                            source={require('@/assets/images/furniture-icon.png')} 
                            style={{ width: 24, height: 24 }}
                            resizeMode='contain'
                            size='xs'/>
                        <Text style={{ padding:8, fontWeight:'bold' }}>Furniture</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.menuBtnItem} onPress={() => { router.push("/product"); }}>
                    <Text style={{ fontWeight:'bold' }}>See All</Text>
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
        backgroundColor: '#081B30',
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
        // height: 88,
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
        marginTop: -8,
    },
    orderButtonSection: {
        marginTop: 16,
    },
});

export default HomeScreen;