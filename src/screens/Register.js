import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Register = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = () => {
    navigation.navigate('Login');
  };
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <View style={styles.mainView}>
          <Text style={styles.registerText}>Register</Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#C4C4C4"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#C4C4C4"
            onChangeText={username => setUsername(username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisiblity}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/images/eyeOpen.png')
                  : require('../assets/images/eyeClosed.png')
              }
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.onPressText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.touchableOpacityText}>
            Already have an account?
          </Text>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
    marginLeft: 5,
  },
  mainView: {
    marginBottom: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 170,
  },
  registerText: {
    justifyContent: 'center',
    fontSize: 30,
    color: '#989494',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  onPressText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: 10,
  },
  touchableOpacityText: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 60,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 30,
  },
  image: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 125,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },

  inputView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginTop: 10,
    alignItems: 'flex-start',
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  eyeIcon: {
    position: 'absolute',
    top: 13,
    right: 15,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIconImage: {
    height: 28,
    width: 36,
    padding: -15,
    backgroundColor: '#FFFFFF',
  },
  registerBtn: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#989494',
    color: '#000000',
  },
  login_button: {
    height: 30,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 5,
  },
});
export default Register;
