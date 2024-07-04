import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../Context/Auth';

const Auth = () => {
  const [screen, setScreen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {handleGoogle} = useAuth();

  //   ====================== LOGIN =============================

  const handleLoginSubmit = () => {
    try {
      if (!email || !password || !email.includes('@')) {
        return Toast.show({
          type: 'error',
          text1: 'Please enter a valid email and password',
        });
      }

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
          });
          setEmail('');
          setPassword('');
          navigation.navigate('drawerNavigation');
        })
        .catch(error => {
          setEmail('');
          setPassword('');
          if (error.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              text1: 'That email address is already in use!',
            });
          }

          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              text1: 'That email address is invalid!',
            });
          }

          if (error.code === 'auth/invalid-credential') {
            Toast.show({
              type: 'error',
              text1: 'Invalid credentials',
            });
          }
        });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  //   ====================== REGISTER =============================

  const handleRegisterSubmit = () => {
    if (!email || !password || !email.includes('@')) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter a valid email and password',
      });
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        Toast.show({
          type: 'success',
          text1: 'User account created & signed in!',
        });
        addUserToFireStore(user);
        setEmail('');
        setPassword('');
        navigation.navigate('drawerNavigation');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'That email address is already in use',
          });
        }

        if (error.code === 'auth/invalid-email') {
          console.log('');
          Toast.show({
            type: 'error',
            text1: 'That email address is invalid!',
          });
        }

        if (error.code === 'auth/invalid-credential') {
          Toast.show({
            type: 'error',
            text1: 'Invalid credentials',
          });
        }

        if (error.code === 'auth/weak-password') {
          Toast.show({
            type: 'error',
            text1: 'Weak password',
          });
        }

        setEmail('');
        setPassword('');
      });
  };

  //   ====================== Add User To Firebase =============================

  const addUserToFireStore = async user => {
    try {
      const data = {
        email: user.user.email,
        emailVerified: user.user.emailVerified,
      };

      firestore()
        .collection('users')
        .add(data)
        .then(() => console.log('user Added to Firestore'));
    } catch (error) {
      console.error('Error adding users: ', error);
    }
  };

  //   ====================== Google Sign In =============================

  const handleGoogleSignIn = async () => {
    try {
      handleGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
      });
    }
  };

  //   ====================== Submit Handler =============================

  const handleSubmit = () => {
    screen ? handleLoginSubmit() : handleRegisterSubmit();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <Text style={styles.ThemedText}>{screen ? 'Sign In' : 'Sign Up'}</Text>

        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            placeholderTextColor={'black'}
            style={{
              color: 'black',
              borderWidth: 1,
              width: 300,
              marginTop: 30,
              marginBottom: 20,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={'black'}
            secureTextEntry
            style={{
              color: 'black',
              borderWidth: 1,
              width: 300,
              marginBottom: 0,
            }}
          />

          <TouchableOpacity
            style={{alignItems: 'flex-end', marginVertical: 10}}
            onPress={() => setScreen(!screen)}>
            <Text style={styles.blueText}>
              {screen
                ? "Don't have an account ? Sign up"
                : 'Already have an account ? Sign in'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={handleSubmit}>
            <Text style={styles.ThemedButtonText}>
              {screen ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            style={[
              styles.ButtonContainer,
              {backgroundColor: 'white', marginTop: 20},
            ]}>
            <Text style={{color: 'black'}}>Sign In With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  ThemedText: {
    fontSize: 24,
    color: 'black',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThemedButtonText: {
    color: 'white',
    fontSize: 16,
  },
  ButtonContainer: {
    backgroundColor: '#64b5f6',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueText: {
    color: 'blue',
  },
});
