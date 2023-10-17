import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {databases, DATABASE_ID, COLLECTION_ID_USERS} from '../../Appwrite'; // Assuming you have imported the necessary Appwrite modules
import {Query} from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [user, setUser] = useState('');

  // Function to log in a user
  const loginUser = async (email, password) => {
    try {
      const querySnapshot = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_USERS,
        [Query.equal('email', email), Query.equal('password', password)],
      );

      if (querySnapshot.total == 0) {
        console.log('No user found with tis email and password');
        return;
      } else {
        // Assuming there is only one matching document, you can access it like this:
        const document = querySnapshot.documents;
        console.log('Match found: ', document);
        if (document[0].name) {
          navigation.navigate('HomeScreen');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Call the loginUser function with user's email and password

  const CustomButton = ({title, onPress}) => {
    return (
      <TouchableOpacity style={styles.rgbutton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // modal related fields

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        backdropOpacity={0.5}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          {/* Close icon in the top-right corner */}
          <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 10}}
            onPress={toggleModal}>
            <Text style={{fontSize: 24}}>✕</Text>
          </TouchableOpacity>

          {/* "Not Approved" message */}
          <Text style={{fontSize: 18}}>Your account is not approved.</Text>
        </View>
      </Modal>

      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} // or secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <CustomButton
        title="Sign In"
        onPress={() => loginUser(email, password)}
      />

      <Text style={styles.subtitleTwo}>
        If you don't have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.lgbutton}>
          {' '}
          Register
        </Text>
      </Text>
    </View>
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
  forgetPasswordContainer: {
    alignSelf: 'flex-end', // Align to the right side
    marginRight: 45, // Add some spacing from the right
  },
  forgetPasswordText: {
    textAlign: 'right', // Align text to the right
    color: '#FD724B',
    fontWeight: 'bold',
    // Other styling properties for the text
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
  forgetpassword: {
    textAlign: 'right',
  },
});

export default LoginScreen;
