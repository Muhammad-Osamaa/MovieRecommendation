import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {databases, DATABASE_ID, COLLECTION_ID_USERS} from '../../Appwrite'; // Assuming you have imported the necessary Appwrite modules

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('student');
  const [password, setPassword] = useState('');

  // const handleCityChange = value => {
  //   setSelectedCity(value);
  // };

  // const handleCitySearch = text => {
  //   const filtered = citiesData.filter(city =>
  //     city.name.toLowerCase().includes(text.toLowerCase()),
  //   );
  //   setFilteredCities(filtered);
  // };

  // useEffect(() => {
  //   setFilteredCities(citiesData);
  // }, []);

  const CustomButton = ({title, onPress}) => {
    return (
      <TouchableOpacity style={styles.rgbutton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const CustomButtonTwo = ({title, onPress}) => {
    return (
      <TouchableOpacity style={styles.rgbutton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const registerUser = async (name, email, password) => {
    try {
      // Assuming databases.createDocuments is an asynchronous function to create a user document in your database
      console.log('log1' + email, password, name, DATABASE_ID, COLLECTION_ID_USERS);
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
        // Assuming you want to navigate to the 'Login' screen
        // You should replace 'navigation.navigate' with your actual navigation logic
        navigation.navigate('HomeScreen');
        setIsRejistered(false);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  let [isRegistred, setIsRejistered] = useState(true);

  return (
    <>
      {isRegistred ? (
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create a new account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChangeText={text => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <CustomButton
            title="Create Account"
            onPress={() => registerUser(name, email, password)}
          />

          <Text style={styles.subtitleTwo}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.lgbutton}>
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

            <CustomButtonTwo
              title="Go to login"
              onPress={() => navigation.navigate('Login')}
            />
            <Text style={styles.subtitleTwo}>
              Organization Account needs admin approval
            </Text>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '80%',
    height: 40,
    paddingBottom: 50,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden', // This is important to prevent the border from being cut off
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 20,
  },
  picker: {
    width: '100%',
    paddingBottom: 5,
    paddingLeft: 5,
  },
  rgbutton: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#FD724B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  lgbutton: {
    color: '#FD724B',
    fontWeight: 'bold',
  },
  subtitleTwo: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto',
  },
});

export default RegisterScreen;
