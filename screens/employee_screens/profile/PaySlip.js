import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Wallet } from '../../../assets/index'; // Assuming Wallet is a local asset
import { EvilIcons } from '@expo/vector-icons';
import { SalarySlip } from '../../../services/SalaryObj';

const PaySlip = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.scrollView}>
            {/* Header with Back Button and Title */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Salary PaySlip</Text>
            </View>

            {/* Total Earning Card */}
            <View style={styles.totalEarningCard}>
                <View>
                    <View style={styles.totalLabelRow}>
                        <Image
                            source={Wallet}
                            style={styles.walletIcon}
                        />
                        <Text style={styles.totalLabel}>Total</Text>
                    </View>
                    <View style={styles.totalAmountContainer}>
                        <Text style={styles.totalAmount}>
                        Rs1520
                        </Text>
                    </View>
                </View>
                
                {/* Year Filter Button */}
                <View style={styles.yearFilterButton}>
                    <View style={styles.yearFilterContent}>
                        <EvilIcons name="calendar" size={24} color={styles.textBluePrimary.color} />
                        <Text style={styles.yearText}>2024</Text>
                    </View>
                    <AntDesign name="down" size={15} color={styles.textBluePrimary.color} />
                </View>
            </View>

            {/* Earning History */}
            <SafeAreaView>
                <Text style={styles.historyTitle}>Earning History</Text>
                
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Month</Text>
                    <Text style={styles.tableHeaderText}>Amount</Text>
                </View>
                
                {/* Salary Slip List */}
                {SalarySlip && SalarySlip.map((list) => (
                    <View style={styles.historyItem} key={list.id}>
                        <Text style={styles.historyItemText}>{list.Month}</Text>
                        <Text style={styles.historyItemText}>{list.amount}</Text>
                    </View>
                ))}
            </SafeAreaView>
        </ScrollView>
    )
}

// --- StyleSheet Definition ---

const styles = StyleSheet.create({
    // Utility Colors
    bgBlue50: { backgroundColor: '#EFF6FF' },
    bgBlue400: { backgroundColor: '#60A5FA' },
    textBluePrimary: { color: '#00a2e4' },
    textGray500: { color: '#6B7280' },
    bgGray300: { backgroundColor: '#D1D5DB' },
    
    // ScrollView (pt-12 px-5 bg-blue-50 h-full)
    scrollView: {
        paddingTop: 48, // pt-12
        paddingHorizontal: 20, // px-5
        backgroundColor: '#EFF6FF', // bg-blue-50
        flex: 1, // h-full
    },

    // Header (flex-row items-center)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Back Button (p-1 bg-blue-400 w-7 rounded-md)
    backButton: {
        padding: 4, // p-1 (approx)
        backgroundColor: '#60A5FA', // bg-blue-400
        width: 28, // w-7
        borderRadius: 6, // rounded-md
    },

    // Header Title (text-center w-[85%] font-semibold text-[18px])
    headerTitle: {
        textAlign: 'center',
        width: '85%', // w-[85%]
        fontWeight: '600', // font-semibold
        fontSize: 18, // text-[18px]
    },

    // Total Earning Card (bg-white rounded-lg px-3 py-2 mt-8 flex-row items-center justify-between)
    totalEarningCard: {
        backgroundColor: 'white',
        borderRadius: 8, // rounded-lg
        paddingHorizontal: 12, // px-3
        paddingVertical: 8, // py-2
        marginTop: 32, // mt-8
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // Total Label Row (flex-row items-center space-x-1)
    totalLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, // space-x-1
    },

    // Wallet Icon (h-8 w-8 object-cover)
    walletIcon: {
        height: 32, // h-8
        width: 32, // w-8
        resizeMode: 'cover', // object-cover
    },

    // Total Label (text-[17px] font-medium text-[#00a2e4])
    totalLabel: {
        fontSize: 17, // text-[17px]
        fontWeight: '500', // font-medium
        color: '#00a2e4', // text-[#00a2e4]
    },

    // Total Amount Container (py-1)
    totalAmountContainer: {
        paddingVertical: 4, // py-1
    },

    // Total Amount (text-[22px] pl-1.5 font-semibold text-[#00a2e4])
    totalAmount: {
        fontSize: 22, // text-[22px]
        paddingLeft: 6, // pl-1.5 (approx)
        fontWeight: '600', // font-semibold
        color: '#00a2e4', // text-[#00a2e4]
    },

    // Year Filter Button (flex-row items-center space-x-5 py-2 px-3 rounded-lg bg-blue-50)
    yearFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20, // space-x-5
        paddingVertical: 8, // py-2
        paddingHorizontal: 12, // px-3
        borderRadius: 8, // rounded-lg
        backgroundColor: '#EFF6FF', // bg-blue-50
    },

    // Year Filter Content (flex-row)
    yearFilterContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    // Year Text (font-medium text-[#00a2e4] mt-[1px])
    yearText: {
        fontWeight: '500', // font-medium
        color: '#00a2e4', // text-[#00a2e4]
        marginTop: 1, // mt-[1px]
    },

    // History Title (py-5 font-semibold text-[17px])
    historyTitle: {
        paddingVertical: 20, // py-5
        fontWeight: '600', // font-semibold
        fontSize: 17, // text-[17px]
    },

    // Table Header (flex-row items-center justify-between)
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8, // Added small margin for separation
    },

    // Table Header Text (text-[13px] text-gray-500 font-medium)
    tableHeaderText: {
        fontSize: 13, // text-[13px]
        color: '#6B7280', // text-gray-500
        fontWeight: '500', // font-medium
    },

    // History Item (flex-row items-center justify-between py-4 border-b border-gray-300)
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16, // py-4
        borderBottomWidth: 1, // border-b
        borderBottomColor: '#D1D5DB', // border-gray-300
    },

    // History Item Text (text-[16px] font-medium)
    historyItemText: {
        fontSize: 16, // text-[16px]
        fontWeight: '500', // font-medium
    },
});

export default PaySlip;