import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { TaskData } from '../../../services/DailyTaskObj';

const DailyTask = () => {
  const [filter, setFilter] = useState('All');

  const filteredTasks = TaskData.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  // --- Helper Functions to map status to styles ---

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFA500'; // Orange
      case 'Complete':
        return '#008000'; // Green
      case 'InProgress':
        return '#0000FF'; // Blue
      default:
        return '#808080'; // Gray
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'Pending':
        return styles.bgOrange500;
      case 'Complete':
        return styles.bgGreen500;
      case 'InProgress':
        return styles.bgBlue500;
      default:
        return styles.bgGray500;
    }
  };

  // --- Component Render ---

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.headerTitle}>Task</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Pending', 'InProgress', 'Complete'].map(status => (
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

      {/* Task List */}
      <View style={styles.taskList}>
        {filteredTasks.map((item) => (
          <View style={styles.taskItemWrapper} key={item.id}>
            {/* Left Status Bar */}
            <View style={[styles.taskStatusBar, getStatusBackground(item.status)]}></View>
            
            {/* Task Content */}
            <View style={styles.taskContent}>
              <View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                
                {/* Date Row */}
                <View style={styles.taskDateRow}>
                  <EvilIcons 
                    name="calendar" 
                    size={22} 
                    color={getStatusColor(item.status)} 
                  />
                  <Text style={[
                    styles.taskDateText, 
                    { color: getStatusColor(item.status) }
                  ]}>
                    {item.date}
                  </Text>
                </View>

                <Text style={styles.taskDescription}>{item.description}</Text>
              </View>

              {/* Status Badge */}
              <View>
                <Text style={[
                  styles.statusBadge, 
                  getStatusBackground(item.status)
                ]}>
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
  textGray400: { color: '#9CA3AF' },
  textBluePrimary: { color: '#00a2e4' }, // text-[#00a2e4]

  // Status Colors (from getStatusStyle/getStatusTextStyle)
  bgOrange500: { backgroundColor: '#F97316' }, // Approximate orange-500
  bgGreen500: { backgroundColor: '#10B981' }, // Approximate green-500
  bgBlue500: { backgroundColor: '#3B82F6' }, // Approximate blue-500
  bgGray500: { backgroundColor: '#6B7280' }, // Approximate gray-500
  
  bgBlue200: { backgroundColor: '#BFDBFE' }, // Approximate blue-200

  // ScrollView (pt-12 px-5 h-full bg-blue-50)
  scrollView: {
    paddingTop: 48, // pt-12 (12 * 4 = 48)
    paddingHorizontal: 20, // px-5
    flex: 1, // h-full
    backgroundColor: '#EFF6FF', // bg-blue-50
  },

  // Header Title (text-[20px] font-semibold)
  headerTitle: {
    fontSize: 20,
    fontWeight: '600', // font-semibold
  },

  // Filter Buttons Container (flex-row items-center justify-between py-4)
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
    backgroundColor: '#EFF6FF', // bg-blue-50 (matches scrollview background)
  },

  // Filter Button Text (text-[#00a2e4] font-medium)
  filterButtonText: {
    color: '#00a2e4',
    fontWeight: '500', // font-medium
  },

  // Task List Container (space-y-5 mt-2)
  taskList: {
    gap: 20, // space-y-5 (5 * 4 = 20)
    marginTop: 8, // mt-2
  },

  // Task Item Wrapper (flex-row items-center w-[97%])
  taskItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%', // w-[97%]
    height: 80, // Giving a fixed height for the status bar to stretch
  },

  // Left Status Bar (w-2 p-1 h-full rounded-tl-md rounded-bl-md)
  taskStatusBar: {
    width: 8, // w-2
    // p-1 is ignored as we want it to just be a solid bar
    height: '100%', // h-full
    borderTopLeftRadius: 6, // rounded-tl-md
    borderBottomLeftRadius: 6, // rounded-bl-md
  },

  // Task Content (bg-white p-2.5 w-full rounded-tr-md rounded-br-md flex-row items-center justify-between)
  taskContent: {
    backgroundColor: 'white',
    padding: 10, // p-2.5
    flex: 1, // To fill the remaining width
    borderTopRightRadius: 6, // rounded-tr-md
    borderBottomRightRadius: 6, // rounded-br-md
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80, // Ensure content matches the status bar height
  },

  // Task Title (text-[15px] font-medium)
  taskTitle: {
    fontSize: 15,
    fontWeight: '500', // font-medium
  },

  // Date Row (flex-row items-center space-x-0.5)
  taskDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2, // space-x-0.5
  },

  // Date Text (pt-0.5 text-[15px] font-medium)
  taskDateText: {
    paddingTop: 2, // pt-0.5
    fontSize: 15,
    fontWeight: '500', // font-medium
  },

  // Description Text (text-[11px] text-gray-400 font-medium pt-0.5)
  taskDescription: {
    fontSize: 11,
    color: '#9CA3AF', // text-gray-400
    fontWeight: '500', // font-medium
    paddingTop: 2, // pt-0.5
  },

  // Status Badge (py-1 px-3 rounded-md text-white)
  statusBadge: {
    paddingVertical: 4, // py-1
    paddingHorizontal: 12, // px-3
    borderRadius: 6, // rounded-md
    color: 'white', // text-white
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default DailyTask;