import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {databases, DATABASE_ID, COLLECTION_ID_USERS} from '../../Appwrite';
import {Query} from 'appwrite';
import Constants from '../assets/Colors/Constants';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmaiFilled, setIsEmailFilled] = useState(false);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setIsPasswordFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsEmailFocused(false);
    setIsPasswordFocused(true);
  };
  const handleBlur = () => {
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };

  const loginUser = async () => {
    if (email.trim() !== '') {
      setIsEmailFilled(true);
    }
    try {
      const querySnapshot = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_USERS,
        [Query.equal('email', email), Query.equal('password', password)],
      );

      if (querySnapshot.total === 0) {
        console.log('No user found with this email and password');
        return;
      }
      const document = querySnapshot.documents[0];
      console.log('Match found: ', document);
      if (document.name) {
        setEmail('');
        setPassword('');
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <View
        style={[
          styles.inputView,
          {
            borderColor: isEmailFocused
              ? Constants.logoColor
              : Constants.grayColor,
            marginBottom:
              isEmaiFilled && email.endsWith('@gmail.com') ? 10 : -45,
          },
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isEmailFocused
                ? Constants.logoColor
                : Constants.darkGray,
              backgroundColor: isEmailFocused
                ? Constants.textColor
                : Constants.inputBackground,
            },
          ]}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setIsEmailFilled(text.trim() !== '');
          }}
          onFocus={handleEmailFocus}
          onBlur={handleBlur}
          accessibilityLabel="Email"
          accessibilityHint="Enter your email address"
        />
      </View>
      {isEmaiFilled && email.endsWith('@gmail.com') && (
        <View
          style={[
            styles.inputView,
            {
              borderColor: isPasswordFocused
                ? Constants.logoColor
                : Constants.grayColor,
            },
          ]}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isPasswordFocused
                  ? Constants.logoColor
                  : Constants.darkGray,
                backgroundColor: isPasswordFocused
                  ? Constants.textColor
                  : Constants.inputBackground,
              },
            ]}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onFocus={handlePasswordFocus}
            onBlur={handleBlur}
            onChangeText={text => setPassword(text)}
            accessibilityLabel="Password"
            accessibilityHint="Enter your password"
          />
          <Pressable style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/images/eyeOpen.png')
                  : require('../assets/images/eyeClosed.png')
              }
              style={styles.eyeIconImage}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitleTwo}>
        If you don't have an account?
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.baseColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constants.logoColor,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: Constants.logoColor,
  },
  inputView: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: Constants.inputBackground,
    paddingLeft: 10,
  },
  eyeIcon: {
    position: 'absolute',
    top: 13,
    right: 15,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIconImage: {
    height: 24,
    width: 36,
    padding: -15,
    backgroundColor: '#C7EEFF',
  },
  buttonContainer: {
    backgroundColor: '#0802A3',
    width: '80%',
    height: 50,
    marginBottom: 10,
    marginVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  button: {
    width: '99%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Constants.textColor,
    fontWeight: 'bold',
    fontSize: 18,

    alignSelf: 'center',
  },
  subtitleTwo: {
    fontSize: 16,
    color: Constants.textColor,
  },
  registerButton: {
    color: Constants.logoColor,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
