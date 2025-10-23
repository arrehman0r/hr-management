import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TimeOffData } from '../../../services/TimeOffObj';
import { useNavigation } from '@react-navigation/native';

const TimeOff = () => {
  const navigate = useNavigation();
  const [filter, setFilter] = useState('All');

  const filteredTasks = TimeOffData.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  // Helper function to get status-specific color styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        // Note: Using orange color for Pending status
        return { backgroundColor: '#FF8C00' }; 
      case 'Accepted':
        return { backgroundColor: '#008000' };
      case 'Submited':
        return { backgroundColor: '#0000FF' };
      case 'Rejected':
        // Note: Using a different orange/red for Rejected (based on your input)
        return { backgroundColor: '#E53E3E' }; 
      default:
        return { backgroundColor: 'gray' };
    }
  };

  // Helper function to get status-specific text styles (for the status badge)
  const getStatusBadgeStyle = (status) => {
      // The badge text is white for all statuses, but we need the background color.
      return [styles.statusBadgeText, getStatusStyle(status)];
  }

  // --- Component Render ---

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header and Plus Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Time Off</Text>
        <TouchableOpacity 
          style={styles.plusButton} 
          onPress={() => navigate.navigate("Send_Timeoff_Form")}
        >
          <Feather name="plus-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Accepted', 'Submited', 'Rejected'].map(status => (
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

      {/* Time Off Request List */}
      <View style={styles.requestList}>
        {filteredTasks.map((item) => (
          <View style={styles.requestItemWrapper} key={item.id}>
            {/* Left Status Bar */}
            <View style={[styles.requestStatusBar, getStatusStyle(item.status)]}></View>
            
            {/* Request Content */}
            <View style={styles.requestContent}>
              <View>
                <Text style={styles.requestTitle}>{item.title}</Text>
                <Text style={styles.requestDateText}>{item.fromdate}</Text>
                <Text style={styles.requestDateText}>{item.todate}</Text>
              </View>
              
              {/* Status Badge */}
              <View>
                <Text style={getStatusBadgeStyle(item.status)}>
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// --- StyleSheet Definition ---

const styles = StyleSheet.create({
  // Utility Colors (from Tailwind)
  bgBlue50: { backgroundColor: '#EFF6FF' },
  bgBlue200: { backgroundColor: '#BFDBFE' },
  textBluePrimary: { color: '#00a2e4' }, 
  textGray500: { color: '#6B7280' }, 

  // ScrollView (pt-12 px-5 h-full bg-blue-50)
  scrollView: {
    paddingTop: 48, // pt-12 (12 * 4 = 48)
    paddingHorizontal: 20, // px-5
    flex: 1, // h-full
    backgroundColor: '#EFF6FF', // bg-blue-50
  },

  // Header (flex-row items-center justify-between)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Header Title (text-[20px] font-semibold)
  headerTitle: {
    fontSize: 20,
    fontWeight: '600', // font-semibold
  },

  // Plus Button (bg-white rounded-full p-0.5)
  plusButton: {
    backgroundColor: 'white',
    borderRadius: 9999, // rounded-full
    padding: 2, // p-0.5 (approx)
  },

  // Filter Container (flex-row items-center justify-between py-4)
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16, // py-4
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

  // Request List Container (space-y-5 mt-2)
  requestList: {
    gap: 20, // space-y-5 (5 * 4 = 20)
    marginTop: 8, // mt-2
  },

  // Request Item Wrapper (flex-row items-center w-[97%])
  requestItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%', // w-[97%]
    height: 80, 
  },

  // Left Status Bar (w-2 p-1 h-full rounded-tl-md rounded-bl-md)
  requestStatusBar: {
    width: 8, // w-2
    height: '100%', // h-full
    borderTopLeftRadius: 6, // rounded-tl-md
    borderBottomLeftRadius: 6, // rounded-bl-md
  },

  // Request Content (bg-white p-2.5 w-full rounded-tr-md rounded-br-md flex-row items-center justify-between)
  requestContent: {
    backgroundColor: 'white',
    padding: 10, // p-2.5
    flex: 1, // w-full
    borderTopRightRadius: 6, // rounded-tr-md
    borderBottomRightRadius: 6, // rounded-br-md
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },

  // Request Title (text-[16px] font-medium)
  requestTitle: {
    fontSize: 16,
    fontWeight: '500', // font-medium
  },

  // Date Text (text-[12px] pt-1  text-gray-500)
  requestDateText: {
    fontSize: 12,
    paddingTop: 4, // pt-1 (approx)
    color: '#6B7280', // text-gray-500
  },

  // Status Badge (py-1 px-3 font-medium rounded-md text-white)
  statusBadgeText: {
    paddingVertical: 4, // py-1
    paddingHorizontal: 12, // px-3
    fontWeight: '500', // font-medium
    borderRadius: 6, // rounded-md
    color: 'white', // text-white (color is overridden by getStatusStyle)
    textAlign: 'center',
  },
});

export default TimeOff;