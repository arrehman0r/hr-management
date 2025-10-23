import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { data, ShiftData, recentData, ShiftData2 } from '../../services/StartingScreenObj';
import { AllNotifications } from '../../services/Notifications';

const StartingScreen = () => {
  const navigation = useNavigation();
  const notifys = AllNotifications.length;

  // Helper function to apply color based on count (used in Recent Activity)
  const getAttendanceStyle = (count) => {
    if (count > 50) {
      return { container: styles.bgGreen100, text: styles.textGreen600 };
    } else if (count > 10) {
      return { container: styles.bgOrange100, text: styles.textOrange400 };
    } else {
      return { container: styles.bgRed100, text: styles.textRed500 };
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {/* Profile Picture and Drawer Button */}
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://img.freepik.com/free-photo/front-view-man-posing_23-2148364843.jpg?t=st=1717328137~exp=1717331737~hmac=6c62d659733e221d1e95715bd236563bea66bccef2e710377b3e11597780177b&w=360' }}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          {/* User Name and Date */}
          <View style={styles.userNameDateContainer}>
            <Text style={styles.userNameText}>
         Tahir Mehmood
            </Text>
            <Text style={styles.dateText}>
              5 June 2025
            </Text>
          </View>
        </View>
        {/* Notification Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Ionicons name="notifications-circle-outline" size={38} color="#00a2e4" style={styles.notificationIcon} />
          <Text style={styles.notificationBadge}>
            {notifys}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Shift Data / Time Info Section */}
      <View style={styles.shiftDataContainer}>
        {/* ShiftData 1 Row */}
        <View style={styles.shiftDataRow}>
          {ShiftData.map((shift) => (
            <View style={styles.shiftDataItem} key={shift.id}>
              <View style={styles.shiftDataCheck}>
                <Image
                  source={shift.image}
                  style={styles.shiftDataImage}
                />
                <Text style={styles.shiftDataCheckText}>
                  {shift.check}
                </Text>
              </View>
              <View style={styles.shiftDataTimeWrapper}>
                <Text style={styles.shiftDataTimeText}>
                  {shift.time}
                </Text>
              </View>
              <View style={styles.shiftDataInTime}>
                <Text style={styles.shiftDataInTimeText}>
                  {shift.InTime}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* ShiftData 2 Row */}
        <View style={styles.shiftDataRow}>
          {ShiftData2.map((shift) => (
            <View style={styles.shiftDataItem} key={shift.id}>
              <View style={styles.shiftDataCheck}>
                <Image
                  source={shift.image}
                  style={styles.shiftDataImage}
                />
                <Text style={styles.shiftDataCheckText}>
                  {shift.check}
                </Text>
              </View>
              <View style={styles.shiftDataTimeWrapper}>
                <Text style={styles.shiftDataTimeText}>
                  {shift.time}
                </Text>
              </View>
              <View style={styles.shiftDataInTime}>
                <Text style={styles.shiftDataInTimeText}>
                  {shift.InTime}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Today's Task Section */}
      <View style={styles.taskSection}>
        {/* Task Header */}
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>
            Today's Task
          </Text>
          <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate("Task")}>
            <Text style={styles.seeMoreText}>
              See more
            </Text>
            {/* Note: Using AntDesign for "rightcircleo" */}
            <AntDesign name="rightcircleo" size={14} color="gray" style={styles.antDesignIcon} />
          </TouchableOpacity>
        </View>

        {/* Task List */}
        {data.length > 0 ? (
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.taskListContent} // Styles applied to the content INSIDE the ScrollView
            style={styles.taskListWrapper} // Styles applied to the ScrollView itself
          >
            {data && data.map((list) => (
              <View style={styles.taskItem} key={list.id}>
                <Text style={styles.taskItemTitle}>
                  {list.title}
                </Text>
                <View style={styles.taskItemDateRow}>
                  <EvilIcons name="calendar" size={22} color="#00a2e4" />
                  <Text style={styles.taskItemDateText}>{list.date}</Text>
                </View>
                <Text style={styles.taskItemDescription}>{list.description}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noTaskText}>No Task Available</Text>
        )}
      </View>

      {/* Recent Activity Section */}
      <View style={styles.activitySection}>
        {/* Activity Header */}
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>
            Recent Activity
          </Text>
          <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate("Attendance")}>
            <Text style={styles.seeMoreText}>
              View all
            </Text>
            {/* Note: Using AntDesign for "rightcircleo" */}
            <AntDesign name="rightcircleo" size={14} color="gray" style={styles.antDesignIcon} />
          </TouchableOpacity>
        </View>
        
        {/* Activity List */}
        {recentData.length > 0 ? (
          <SafeAreaView style={styles.activityList}>
            {recentData && recentData.map((list) => (
              <TouchableOpacity key={list.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <View style={styles.activityIconBackground}>
                    <Image
                      source={list.image}
                      style={styles.activityIconImage}
                    />
                  </View>
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityTitleText}>{list.title}</Text>
                    <Text style={styles.activityDateText}>{list.date}</Text>
                  </View>
                </View>
                <View style={styles.activityTimeAttendance}>
                  <Text style={styles.activityTimeText}>{list.time}</Text>
                  <Text style={styles.activityAttendanceText}>{list.attendance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        ) : (
          <Text style={styles.noTaskText}>No Activity Available</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Stylesheet definition
const styles = StyleSheet.create({
  // Utility Colors (Based on your ManagerHomeScreen styles and Tailwind defaults)
  bgBlue50: { backgroundColor: '#EFF6FF' }, // bg-blue-50
  textGray500: { color: '#6B7280' }, // text-gray-500
  textWhite: { color: '#FFFFFF' }, // text-white
  textBluePrimary: { color: '#00a2e4' }, // #00a2e4
  bgBluePrimary: { backgroundColor: '#00a2e4' }, // bg-[#00a2e4]
  bgIconBlue: { backgroundColor: 'rgba(0, 163, 228, 0.09)' }, // bg-[#00a3e417]

  // Dynamic Attendance Colors (Based on Tailwind's default color palette)
  bgGreen100: { backgroundColor: '#D1FAE5' }, // bg-green-100
  textGreen600: { color: '#059669' }, // text-green-600
  bgOrange100: { backgroundColor: '#FFEDD5' }, // bg-orange-100
  textOrange400: { color: '#FB923C' }, // text-orange-400
  bgRed100: { backgroundColor: '#FEE2E2' }, // bg-red-100
  textRed500: { color: '#EF4444' }, // text-red-500

  // ScrollView
  scrollView: {
    paddingTop: 32, // pt-8 (8 * 4 = 32)
    backgroundColor: '#EFF6FF', // bg-blue-50
    // height: '120vh' is hard to translate directly in RN,
    // usually flex: 1 or no height is used for scrollviews.
    // If the component must be tall, the parent container should handle height.
    // For now, we omit the fixed height in the scroll view.
  },

  // Header Section (px-5 py-4 flex-row justify-between items-center)
  header: {
    paddingHorizontal: 20, // px-5
    paddingVertical: 16, // py-4
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // User Info (flex-row items-center space-x-3)
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // space-x-3 (3 * 4 = 12)
  },

  // ... (Previous styles)

  // Task List Container (Replaced 'taskListContainer' with these two styles)
  taskListWrapper: {
    marginTop: 16, // mt-4
    // Ensures the ScrollView itself is styled correctly
  },
  taskListContent: {
    flexDirection: 'row', // Horizontal list items
    alignItems: 'center',
    gap: 16, // space-x-4 (4 * 4 = 16) - spacing between items
    paddingRight: 20, // Add padding to the end of the content to make the last item fully visible
  },

  // Task Item (bg-white rounded-lg p-2.5 space-y-0.5 w-[80%])
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8, // rounded-lg
    padding: 10, // p-2.5
    gap: 2, // space-y-0.5
    width: 280, // Using a fixed width (approx. 80% of a typical phone screen) instead of '80%'
  },
// ... (Rest of the styles)

  // Profile Button (h-14 w-14 bg-white rounded-full p-[3px])
  profileButton: {
    height: 56, // h-14
    width: 56, // w-14
    backgroundColor: 'white',
    borderRadius: 9999, // rounded-full
    padding: 3, // p-[3px]
  },

  // Profile Image Container (h-full w-full object-cover rounded-full)
  profileImageContainer: {
    height: '100%', // h-full
    width: '100%', // w-full
    borderRadius: 9999, // rounded-full
    overflow: 'hidden', // For object-cover effect within the container
  },
  profileImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // object-cover
  },

  // User Name/Date (space-y-1)
  userNameDateContainer: {
    gap: 4, // space-y-1 (1 * 4 = 4)
  },
  userNameText: {
    fontSize: 18, // text-[18px]
    fontWeight: '600', // font-semibold
  },
  dateText: {
    color: '#6B7280', // text-gray-500
    fontWeight: '600', // font-semibold
    fontSize: 13, // text-[13px]
  },

  // Notification Icon & Badge
  notificationIcon: {
    position: 'relative', // className="relative"
  },
  notificationBadge: {
    position: 'absolute',
    backgroundColor: '#00a2e4', // bg-[#00a2e4]
    color: 'white', // text-white
    borderRadius: 9999, // rounded-full
    height: 16, // h-4
    width: 16, // w-4
    textAlign: 'center',
    fontSize: 10, // text-[10px]
    left: 25, // left-[25px]
    lineHeight: 16, // Ensure text is centered vertically
  },

  // Shift Data Section (px-5 pb-6 mt-1 space-y-3)
  shiftDataContainer: {
    paddingHorizontal: 20, // px-5
    paddingBottom: 24, // pb-6
    marginTop: 4, // mt-1
    gap: 12, // space-y-3 (3 * 4 = 12)
  },

  // Shift Data Row (flex-row justify-between items-center space-x-3)
  shiftDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12, // space-x-3
  },

  // Shift Data Item (flex-1 h-[12vh] bg-white rounded-lg)
  shiftDataItem: {
    flex: 1, // flex-1
    height: 90, // Approx 12vh
    backgroundColor: 'white',
    borderRadius: 8, // rounded-lg
  },

  // Shift Data Check (p-2.5 flex-row items-center space-x-1)
  shiftDataCheck: {
    padding: 10, // p-2.5 (2.5 * 4 = 10)
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // space-x-1
  },
  shiftDataImage: {
    height: 24, // h-6
    width: 24, // w-6
    resizeMode: 'cover', // object-cover
  },
  shiftDataCheckText: {
    color: '#6B7280', // text-gray-500
    fontWeight: '600', // font-semibold
  },

  // Shift Data Time Wrapper (pl-3 -my-1)
  shiftDataTimeWrapper: {
    paddingLeft: 12, // pl-3
    marginTop: -4, // -my-1
    marginBottom: -4, // -my-1
  },
  shiftDataTimeText: {
    fontSize: 20, // text-[20px]
    fontWeight: '600', // font-semibold
  },

  // Shift Data InTime (px-3 flex-row justify-between items-center mt-2)
  shiftDataInTime: {
    paddingHorizontal: 12, // px-3
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8, // mt-2
  },
  shiftDataInTimeText: {
    fontWeight: '500', // font-medium
    color: '#6B7280', // text-gray-500
  },

  // Task Section (px-5)
  taskSection: {
    paddingHorizontal: 20, // px-5
  },

  // Task Header (flex-row items-center justify-between)
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontWeight: '600', // font-semibold
    fontSize: 18, // text-[18px]
  },

  // See More Button (flex-row items-center space-x-1)
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // space-x-1
  },
  seeMoreText: {
    color: '#6B7280', // text-gray-500
    textAlign: 'right',
    fontSize: 14, // text-[14px]
    fontWeight: '500', // font-medium
    paddingBottom: 2, // pb-0.5
  },
  antDesignIcon: {
    marginLeft: 8, // ml-2
  },

  // Task List Container (mt-4 flex-row items-center space-x-4)
  taskListContainer: {
    marginTop: 16, // mt-4
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // space-x-4
  },

  // Task Item (bg-white rounded-lg p-2.5 space-y-0.5 w-[80%])
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8, // rounded-lg
    padding: 10, // p-2.5
    gap: 2, // space-y-0.5
    width: '80%', // w-[80%]
  },
  taskItemTitle: {
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
  },

  // Task Item Date Row (flex-row items-center space-x-0.5)
  taskItemDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2, // space-x-0.5
  },
  taskItemDateText: {
    paddingTop: 2, // pt-0.5
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
    color: '#00a2e4', // text-[#00a2e4]
  },
  taskItemDescription: {
    fontSize: 11, // text-[11px]
    color: '#9CA3AF', // text-gray-400 (approximated)
    fontWeight: '500', // font-medium
    paddingTop: 2, // pt-0.5
  },
  noTaskText: {
    textAlign: 'center',
    marginTop: 12, // mt-3
    fontWeight: '500', // font-medium
    color: '#6B7280', // text-gray-500
  },

  // Activity Section (px-5)
  activitySection: {
    paddingHorizontal: 20, // px-5
  },

  // Activity Header (flex-row items-center justify-between py-5)
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20, // py-5
  },
  activityTitle: {
    fontWeight: '600', // font-semibold
    fontSize: 18, // text-[18px]
  },

  // Activity List (space-y-4)
  activityList: {
    gap: 16, // space-y-4 (4 * 4 = 16)
  },

  // Activity Item (bg-white p-2.5 rounded-lg flex-row items-center justify-between)
  activityItem: {
    backgroundColor: 'white',
    padding: 10, // p-2.5
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Activity Info (flex-row space-x-3 pl-1)
  activityInfo: {
    flexDirection: 'row',
    gap: 12, // space-x-3
    paddingLeft: 4, // pl-1
  },

  // Activity Icon Background (h-10 w-10 p-1.5 rounded-lg bg-[#00a3e417])
  activityIconBackground: {
    height: 40, // h-10
    width: 40, // w-10
    padding: 6, // p-1.5
    borderRadius: 8, // rounded-lg
    backgroundColor: 'rgba(0, 163, 228, 0.09)', // bg-[#00a3e417]
  },
  activityIconImage: {
    height: '100%', // h-full
    width: '100%', // w-full
    resizeMode: 'cover', // object-cover
  },

  // Activity Text Container (space-y-0.5)
  activityTextContainer: {
    gap: 2, // space-y-0.5
  },
  activityTitleText: {
    fontSize: 15, // text-[15px]
    fontWeight: '600', // font-semibold
  },
  activityDateText: {
    fontSize: 11, // text-[11px]
    fontWeight: '500', // font-medium
    color: '#9CA3AF', // text-gray-400
  },

  // Activity Time & Attendance (space-y-0.5 pr-1)
  activityTimeAttendance: {
    gap: 2, // space-y-0.5
    paddingRight: 4, // pr-1
  },
  activityTimeText: {
    fontWeight: '600', // font-semibold
  },
  activityAttendanceText: {
    textAlign: 'right',
    fontSize: 12, // text-[12px]
    fontWeight: '500', // font-medium
    color: '#9CA3AF', // text-gray-400
  },
});

export default StartingScreen;