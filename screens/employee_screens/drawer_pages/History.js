import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { AttendanceData } from '../../../services/AttendanceObj';

const History = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('All');

  const filteredTasks = AttendanceData.filter(task =>
    // The filter logic seems to be comparing `task.att` property with the filter state
    filter === 'All' ? true : task.att === filter 
  );

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Weekly', 'Monthly', 'Yearly'].map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilter(status)}
            style={[
              styles.filterButton,
              filter === status ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
          >
            <Text style={styles.filterButtonText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryTitle}>Attendace For</Text>
          <Text style={styles.summaryValue}>February</Text>
        </View>
        <View>
          <Text style={styles.summaryTitle}>Total Hours</Text>
          <Text style={styles.summaryValueRight}>410</Text>
        </View>
      </View>

      {/* Attendance History List */}
      <SafeAreaView style={styles.historyList}>
        {filteredTasks && filteredTasks.map((list) => (
          <TouchableOpacity key={list.id} style={styles.historyItem}>
            {/* Left Content (Icon and Shift Info) */}
            <View style={styles.leftContent}>
              <View style={styles.iconContainer}>
                <Image
                  source={list.image}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.shiftInfo}>
                <Text style={styles.shiftTypeText}>{list.shifttype}</Text>
                <Text style={styles.dateText}>{list.date}</Text>
              </View>
            </View>
            
            {/* Right Content (Time and Status) */}
            <View style={styles.rightContent}>
              <Text style={styles.timeText}>{list.time}</Text>
              <Text style={styles.statusText}>{list.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

// --- StyleSheet Definition ---

const styles = StyleSheet.create({
  // Utility Colors
  bgBlue50: { backgroundColor: '#EFF6FF' },
  bgBlue100: { backgroundColor: '#DBEAFE' }, // bg-blue-100
  bgBlue200: { backgroundColor: '#BFDBFE' }, // bg-blue-200
  bgBlue400: { backgroundColor: '#60A5FA' }, // bg-blue-400
  textBluePrimary: { color: '#00a2e4' },
  textGray400: { color: '#9CA3AF' },


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
  
  // --- Filter Buttons ---
  // Filter Container (flex-row items-center justify-between py-5 mt-3)
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20, // py-5
    marginTop: 12, // mt-3
  },

  // Filter Button Base Style
  filterButton: {
    borderRadius: 6, // rounded-md
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
  },

  // Filter Button Active State
  filterButtonActive: {
    backgroundColor: '#BFDBFE', // bg-blue-200
  },

  // Filter Button Inactive State
  filterButtonInactive: {
    backgroundColor: '#EFF6FF', // bg-blue-50
  },

  // Filter Button Text (text-[#00a2e4] font-medium)
  filterButtonText: {
    color: '#00a2e4',
    fontWeight: '500', // font-medium
  },
  
  // --- Summary Card ---
  // Summary Card (px-4 py-3 bg-blue-100 rounded-md flex-row items-center justify-between)
  summaryCard: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    backgroundColor: '#DBEAFE', // bg-blue-100
    borderRadius: 6, // rounded-md
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Summary Title (text-[16px] font-semibold)
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600', // font-semibold
  },

  // Summary Value (text-[14px] font-medium text-[#00a2e4])
  summaryValue: {
    fontSize: 14,
    fontWeight: '500', // font-medium
    color: '#00a2e4', // text-[#00a2e4]
  },
  
  // Summary Value Right (text-right text-[14px] font-medium text-[#00a2e4])
  summaryValueRight: {
    fontSize: 14,
    fontWeight: '500', // font-medium
    color: '#00a2e4', // text-[#00a2e4]
    textAlign: 'right', // text-right
  },

  // --- Attendance History List ---
  // History List (space-y-4 mt-5)
  historyList: {
    gap: 16, // space-y-4
    marginTop: 20, // mt-5
  },

  // History Item (bg-white p-2.5 rounded-lg flex-row items-center justify-between)
  historyItem: {
    backgroundColor: 'white',
    padding: 10, // p-2.5
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Left Content (flex-row space-x-3 pl-1)
  leftContent: {
    flexDirection: 'row',
    gap: 12, // space-x-3
    paddingLeft: 4, // pl-1
    alignItems: 'center',
  },

  // Icon Container (h-10 w-10 p-1.5 rounded-lg bg-[#00a3e417])
  iconContainer: {
    height: 40, // h-10
    width: 40, // w-10
    padding: 6, // p-1.5
    borderRadius: 8, // rounded-lg
    backgroundColor: 'rgba(0, 163, 228, 0.09)', // bg-[#00a3e417]
  },

  // Item Image (h-full w-full object-cover)
  itemImage: {
    height: '100%', // h-full
    width: '100%', // w-full
    resizeMode: 'cover', // object-cover
  },

  // Shift Info (space-y-0.5)
  shiftInfo: {
    gap: 2, // space-y-0.5
  },

  // Shift Type Text (text-[15px] font-semibold)
  shiftTypeText: {
    fontSize: 15,
    fontWeight: '600', // font-semibold
  },

  // Date Text (text-[11px] font-medium text-gray-400)
  dateText: {
    fontSize: 11,
    fontWeight: '500', // font-medium
    color: '#9CA3AF', // text-gray-400
  },

  // Right Content (space-y-0.5 pr-1)
  rightContent: {
    gap: 2, // space-y-0.5
    paddingRight: 4, // pr-1
  },

  // Time Text (font-semibold)
  timeText: {
    fontWeight: '600', // font-semibold
  },

  // Status Text (text-right text-[12px] font-medium text-gray-400)
  statusText: {
    textAlign: 'right', // text-right
    fontSize: 12,
    fontWeight: '500', // font-medium
    color: '#9CA3AF', // text-gray-400
  },
});

export default History;