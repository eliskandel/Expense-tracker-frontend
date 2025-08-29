import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": email, "password": password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Login successful
        console.log('Login success:', data);
        Alert.alert('Success', 'You are logged in!');
        // You can navigate to another screen here
        // navigation.navigate('Home');
      } else {
        // Login failed
        console.log('Login failed:', data);
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Network error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 bg-gray-100">
      <View className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm">
        <View className="items-center mb-6">
          <Image
            source={require('../../assets/Expense Tracer.png')}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-purple-700 mt-2">
            Welcome to Rupaiyaa
          </Text>
          <Text className="text-sm text-gray-500">
            Your smart budget tracking companion
          </Text>
        </View>

        <View className="flex-row rounded-full p-1 bg-gray-200 mb-6">
          <TouchableOpacity className="flex-1 items-center py-2 px-4 rounded-full bg-white shadow">
            <Text className="font-semibold text-purple-700">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-2 px-4 rounded-full">
            <Text className="font-semibold text-gray-500">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-1">Email</Text>
            <TextInput
              className="w-full px-4 py-3 rounded-xl border border-gray-300"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="text-gray-600 mb-1">Password</Text>
            <TextInput
              className="w-full px-4 py-3 rounded-xl border border-gray-300"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          className="w-full bg-purple-700 py-4 rounded-xl mt-6"
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold">Login</Text>
          )}
        </TouchableOpacity>

        <Text className="text-xs text-gray-400 text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
