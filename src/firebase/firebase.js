import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/app';

GoogleSignin.configure({
  webClientId:
    '281803274093-8v4jmpe74dd613d127l0noof8pvgrarg.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error after logging it
  }
};
