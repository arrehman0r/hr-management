import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
// Assuming these imports point to your local assets
import { PaySlip, Reimbursment, Profile } from '../../../assets/index'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Note: The commented out lines below should only be uncommented if you need to use the imported assets.
    // console.log("User logging out..."); 
    await AsyncStorage.removeItem('isAuthenticated');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.scrollView}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Card and Image */}
      <View style={styles.profileCardWrapper}>
        {/* Profile Image */}
        <View style={styles.profileImageCircle}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-photo/front-view-man-posing_23-2148364843.jpg?t=st=1717328137~exp=1717331737~hmac=6c62d659733e221d1e95715bd236563bea66bccef2e710377b3e11597780177b&w=360' }}
            style={styles.profileImage}
          />
        </View>
        
        {/* Profile Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.nameText}>
            {/* The line below is a placeholder as the actual user data is commented out */}
            {/* {user?.name || "Vishal Rawat"} */}
            Tahir Mehmood
          </Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitleText}>
              Backend Developer
            </Text>
          </View>

          {/* Earning Button */}
          <TouchableOpacity 
            style={styles.earningButton} 
            onPress={() => navigation.navigate("PaySlip")}
          >
            <View style={styles.earningButtonContent}>
              <Ionicons name="wallet-outline" size={24} color="white" />
              <Text style={styles.earningLabel}>
                Earning :
              </Text>
              <Text style={styles.earningValue}>
                Rs1520
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          {/* Time Off Stat */}
          <View style={[styles.statItem, styles.statBorderRight]}>
            <Text style={styles.statLabel}>Time of</Text>
            <Text style={styles.statValue}>02</Text>
          </View>
          {/* Attendance Stat */}
          <View style={[styles.statItem, styles.statBorderRight]}>
            <Text style={styles.statLabel}>Attendace</Text>
            <Text style={styles.statValue}>31</Text>
          </View>
          {/* OverTime Stat */}
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>OverTime</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>
      </View>

      {/* Navigation Links */}
      <View style={styles.linksSection}>
        {/* Profile Details */}
        <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate("ProfileDetails")}>
          <View style={styles.linkContent}>
            <View style={styles.linkIconContainer}>
              {/* Assuming Profile is a local image asset */}
              <Image source={Profile} style={styles.linkIcon} />
            </View>
            <Text style={styles.linkText}>
              Profile Details
            </Text>
          </View>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>
        
        {/* My PaySlip */}
        <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate("PaySlip")}>
          <View style={styles.linkContent}>
            <View style={styles.linkIconContainer}>
              {/* Assuming PaySlip is a local image asset */}
              <Image source={PaySlip} style={styles.linkIconFull} /> 
            </View>
            <Text style={styles.linkText}>
              My PaySlip
            </Text>
          </View>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>
        
        {/* The commented out 'Setting' link is removed here for cleanliness, but can be re-added if needed. */}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// --- StyleSheet Definition ---

const styles = StyleSheet.create({
  // Utility Colors
  bgBlue50: { backgroundColor: '#EFF6FF' },
  bgBlue400: { backgroundColor: '#60A5FA' },
  bgIndigo100: { backgroundColor: '#E0E7FF' },
  textGray500: { color: '#6B7280' },
  textBluePrimary: { color: '#00a2e4' },
  bgBluePrimary: { backgroundColor: '#00a2e4' },
  textBlue500: { color: '#3B82F6' },
  
  // ScrollView (pt-10 bg-blue-50 h-full)
  scrollView: {
    paddingTop: 40, // pt-10 (10 * 4 = 40)
    backgroundColor: '#EFF6FF', // bg-blue-50
    flex: 1, // h-full
  },

  // Back Button Container (flex-row items-center justify-between p-4)
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjusted from 'space-between' since there's only one item
    padding: 16, // p-4
  },

  // Back Button (flex-row items-center space-x-1 bg-blue-400 rounded-md py-1 px-1)
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // space-x-1
    backgroundColor: '#60A5FA', // bg-blue-400
    borderRadius: 6, // rounded-md
    paddingVertical: 4, // py-1
    paddingHorizontal: 4, // px-1
  },

  // Profile Card Wrapper (p-5 -top-8)
  profileCardWrapper: {
    paddingHorizontal: 20, // p-5
    marginTop: -32, // -top-8 (8 * 4 = 32)
    marginBottom: 16, // Added to prevent overlap with the next section
  },

  // Profile Image Circle (h-32 w-32 bg-white rounded-full p-1.5 z-10 left-[40%] absolute)
  profileImageCircle: {
    height: 128, // h-32
    width: 128, // w-32
    backgroundColor: 'white',
    borderRadius: 9999, // rounded-full
    padding: 6, // p-1.5
    zIndex: 10, // z-10
    position: 'absolute', // absolute
    alignSelf: 'center', // Centering the absolute element
    top: 0, // Aligning to the top of the wrapper
  },

  // Profile Image (h-full w-full object-cover rounded-full)
  profileImage: {
    height: '100%', // h-full
    width: '100%', // w-full
    resizeMode: 'cover', // object-cover
    borderRadius: 9999, // rounded-full
  },

  // Details Card (bg-white rounded-lg space-y-1 py-8 top-[15%] z-0 relative)
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 8, // rounded-lg
    gap: 4, // space-y-1
    paddingVertical: 32, // py-8
    marginTop: 60, // Adjusting based on profile image size (top-[15%] approximation)
    zIndex: 0, // z-0
    position: 'relative', // relative
  },

  // Name Text (text-center mt-10 text-[25px] font-semibold text-[#00a2e4])
  nameText: {
    textAlign: 'center',
    marginTop: 40, // mt-10 (40) - Adjusted to account for the absolute image
    fontSize: 25, // text-[25px]
    fontWeight: '600', // font-semibold
    color: '#00a2e4', // text-[#00a2e4]
  },

  // Job Title Container (py-2 flex-row items-center justify-center px-2)
  jobTitleContainer: {
    paddingVertical: 8, // py-2
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8, // px-2
  },
  jobTitleText: {
    textAlign: 'center',
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
    color: '#6B7280', // text-gray-500
  },

  // Earning Button (bg-[#00a2e4] py-3 rounded-lg mx-4)
  earningButton: {
    backgroundColor: '#00a2e4', // bg-[#00a2e4]
    paddingVertical: 12, // py-3
    borderRadius: 8, // rounded-lg
    marginHorizontal: 16, // mx-4
  },
  
  // Earning Button Content (flex-row items-center space-x-2 justify-center)
  earningButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // space-x-2
    justifyContent: 'center',
  },
  earningLabel: {
    fontSize: 18, // text-[18px]
    color: 'white', // text-white
    fontWeight: '600', // font-semibold
  },
  earningValue: {
    color: 'white', // text-white
    fontSize: 16, // text-[16px]
    fontWeight: '500', // font-medium
  },

  // Stats Section (px-5 mt-0.5)
  statsSection: {
    paddingHorizontal: 20, // px-5
    marginTop: 2, // mt-0.5
  },

  // Stats Container (bg-indigo-100 rounded-lg flex-row items-center p-4 justify-between)
  statsContainer: {
    backgroundColor: '#E0E7FF', // bg-indigo-100
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // p-4
    justifyContent: 'space-between',
  },

  // Stat Item (flex-1)
  statItem: {
    flex: 1,
  },
  
  // Stat Border Right (border-r border-gray-300)
  statBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB', // Approximate gray-300
  },

  // Stat Label (text-center text-gray-500 text-[15px])
  statLabel: {
    textAlign: 'center',
    color: '#6B7280', // text-gray-500
    fontSize: 15, // text-[15px]
  },

  // Stat Value (text-center text-[27px] font-semibold)
  statValue: {
    textAlign: 'center',
    fontSize: 27, // text-[27px]
    fontWeight: '600', // font-semibold
  },

  // Links Section (px-4 mt-5 space-y-4)
  linksSection: {
    paddingHorizontal: 16, // px-4
    marginTop: 20, // mt-5
    gap: 16, // space-y-4
  },

  // Link Item (px-4 py-2 flex-row items-center justify-between rounded-lg border-gray-300 bg-white)
  linkItem: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8, // rounded-lg
    // borderWidth: 1, // border-gray-300 (omitted for cleaner look, you can add it back)
    // borderColor: '#D1D5DB', 
    backgroundColor: 'white',
  },
  
  // Link Content (items-center flex-row space-x-1.5)
  linkContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6, // space-x-1.5
  },

  // Link Icon Container (h-8 w-8 rounded-full flex-row items-center justify-center overflow-hidden)
  linkIconContainer: {
    height: 32, // h-8
    width: 32, // w-8
    borderRadius: 9999, // rounded-full
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // Profile Icon (h-6 w-6 object-cover)
  linkIcon: {
    height: 24, // h-6
    width: 24, // w-6
    resizeMode: 'cover', // object-cover
  },
  // PaySlip Icon (h-full w-full object-cover rounded-full)
  linkIconFull: {
    height: '100%', // h-full
    width: '100%', // w-full
    resizeMode: 'cover', // object-cover
    borderRadius: 9999, // rounded-full
  },

  // Link Text (text-center text-[16px] font-semibold)
  linkText: {
    textAlign: 'center',
    fontSize: 16, // text-[16px]
    fontWeight: '600', // font-semibold
  },

  // Logout Button (mx-4 mt-20 border p-3.5 rounded-lg border-blue-400 bg-blue-100)
  logoutButton: {
    marginHorizontal: 16, // mx-4
    marginTop: 80, // mt-20
    borderWidth: 1, // border
    padding: 14, // p-3.5
    borderRadius: 8, // rounded-lg
    borderColor: '#60A5FA', // border-blue-400
    backgroundColor: '#DBEAFE', // bg-blue-100
  },

  // Logout Button Text (text-center text-blue-500 font-medium)
  logoutButtonText: {
    textAlign: 'center',
    color: '#3B82F6', // text-blue-500
    fontWeight: '500', // font-medium
  },
});

export default UserProfile;