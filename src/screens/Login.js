import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
          <View style={styles.mainView}>
            <Text style={styles.mainViewText}>Log In</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              ref={emailInputRef}
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#C4C4C4"
              onChangeText={username => setEmail(username)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              ref={passwordInputRef}
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
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.touchableOpacityText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.secondTouchableOpacity}>
              Don't I have an account?
            </Text>
            <Text
              onPress={() => props.navigation.navigate('Register')}
              style={styles.onPressText}>
              Register
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
    marginLeft: 5,
  },
  image: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 125,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    marginTop: 30,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  mainView: {
    marginBottom: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 200,
  },
  mainViewText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#989494',
  },
  inputView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginTop: 10,
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
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIconImage: {
    height: 24,
    width: 36,
    padding: -15,
    backgroundColor: '#FFFFFF',
  },
  touchableOpacityText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 10,
  },
  secondTouchableOpacity: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 70,
    marginTop: 20,
  },
  onPressText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginBtn: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#989494',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  register_button: {
    height: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
});
export default Login;
