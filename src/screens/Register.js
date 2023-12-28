import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {databases, DATABASE_ID, COLLECTION_ID_USERS} from '../../Appwrite'; // Assuming you have imported the necessary Appwrite modules
import Constants from '../assets/Colors/Constants';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [isRegistred, setIsRegistered] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);

  const handleNameFocus = () => {
    setIsNameFocused(true);
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };
  const handleEmailFocus = () => {
    setIsNameFocused(false);
    setIsEmailFocused(true);
    setIsPasswordFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsNameFocused(false);
    setIsEmailFocused(false);
    setIsPasswordFocused(true);
  };
  const handleBlur = () => {
    setIsNameFocused(false);
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };
  const CustomButton = ({title, onPress}) => {
    return (
      <TouchableOpacity style={styles.rgbutton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const registerUser = async (name, email, password) => {
    if (!name || !email || !password) {
      Alert.alert(
        'Please fill all the Input Fields',
        'All input Fields are required.',
      );
      return;
    }
    try {
      // Assuming databases.createDocuments is an asynchronous function to create a user document in your database
      console.log(
        'log1' + email,
        password,
        name,
        DATABASE_ID,
        COLLECTION_ID_USERS,
      );
      const querySnapshot = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_USERS,
        'unique()',
        {
          name: name,
          email: email,
          password: password,
          // "userType": userType
        },
      );

      // Check if the user document was created successfully
      if (querySnapshot.total === 0) {
        console.log('No user found with this email and password');
        return;
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      console.error('Error response data:', error.response.data);
      throw error;
    }
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      {isRegistred ? (
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Create a new account</Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: isNameFocused
                  ? Constants.logoColor
                  : Constants.grayColor,
              },
            ]}
            placeholder="Full name"
            value={name}
            onChangeText={text => setName(text)}
            onFocus={handleNameFocus}
            onBlur={handleBlur}
          />

          <TextInput
            style={[
              styles.input,
              {
                borderColor: isEmailFocused
                  ? Constants.logoColor
                  : Constants.grayColor,
              },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={handleEmailFocus}
            onBlur={handleBlur}
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isPasswordFocused
                  ? Constants.logoColor
                  : Constants.grayColor,
              },
            ]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={handlePasswordFocus}
            onBlur={handleBlur}
          />
          <CustomButton
            title="Create Account"
            onPress={() => registerUser(name, email, password)}
          />

          <Text style={styles.subtitleTwo}>
            Already have an account?{' '}
            <Text onPress={goToLogin} style={styles.lgbutton}>
              {' '}
              Login
            </Text>
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.subtitle}>
              You Account is successfully created{' '}
            </Text>

            <CustomButton title="Go to login" onPress={goToLogin} />
          </View>
        </>
      )}
    </>
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
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: Constants.logoColor,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: Constants.logoColor,
    borderWidth: 2,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  rgbutton: {
    width: '80%',
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#0802A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  lgbutton: {
    color: Constants.logoColor,
    fontWeight: 'bold',
  },
  subtitleTwo: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto',
    color: '#C7EEFF',
  },
});

export default RegisterScreen;
