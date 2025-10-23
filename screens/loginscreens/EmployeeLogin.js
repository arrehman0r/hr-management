import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../auth/authSlice';

const schema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const EmployeeLogin = ({ setRole, navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const onSubmit = data => {
    dispatch(loginUser({
      username: data.username,
      password: data.password,
    }));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      setRole('employee');
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Circles - Must remain outside KeyboardAvoidingView for fixed positioning */}
      <View style={styles.circleContainerTop}>
        <View style={styles.circleLarge}></View>
        <View style={styles.circleSmall}></View>
      </View>
      <View style={styles.circleContainerBottom}>
        <View style={styles.circleLarge}></View>
        <View style={styles.circleSmall}></View>
      </View>

      {/* KeyboardAvoidingView for handling keyboard overlap */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Image
              source={{ uri: 'https://img.freepik.com/free-vector/selecting-team-concept-illustration_114360-5423.jpg?t=st=1717262181~exp=1717265781~hmac=48ec52b79b830bc0c0215cd4418ccab9c07eede31b6bc11fc530befc36c7218f&w=740' }}
              style={styles.logo}
            />
            <View style={styles.header}>
              <Text style={styles.headerText}>Employee Login</Text>
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="employeeId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, errors.employeeId && { borderColor: 'red' }]}
                      placeholder="Employee ID"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.employeeId && <Text style={styles.errorText}>{errors.employeeId.message}</Text>}
                  </>
                )}
              />
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, errors.username && { borderColor: 'red' }]}
                      placeholder="Username"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                  </>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, errors.password && { borderColor: 'red' }]}
                      placeholder="Password"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                  </>
                )}
              />
              {/* Converted Style: className="py-1.5 text-center text-red-500 text-[15px] font-medium" */}
              {error ? <Text style={styles.apiErrorText}>{error}</Text> : null}
              
              <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate("ManagerLogin")}>
                <Text style={styles.goBackButtonText}>Login as Manager</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  // New container to allow KeyboardAvoidingView to take full height
  keyboardAvoidingContainer: {
    flex: 1,
    paddingHorizontal: 10, // Matching the original padding
  },
  // ScrollView Content (to allow scrolling when content is larger than screen)
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },

  // --- Background Circles ---
  circleContainerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    zIndex: 10
  },
  circleContainerBottom: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    width: 100,
    height: 100,
  },
  circleLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#B0B0B0',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  circleSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D3D3D3',
    position: 'absolute',
    top: 50,
    left: 70,
  },

  // --- Form Content ---
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: -20,
    marginTop: -50
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },

  // --- Buttons ---
  button: {
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    height: 50,
    backgroundColor: '#cccccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButtonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // --- Error Text ---
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  // Converted style for API error text:
  // className="py-1.5 text-center text-red-500 text-[15px] font-medium"
  apiErrorText: {
    paddingVertical: 6, // py-1.5
    textAlign: 'center',
    color: '#EF4444', // text-red-500
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
  },
});

export default EmployeeLogin;