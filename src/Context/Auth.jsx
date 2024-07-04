// AuthContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {WEB_CLIENT_ID} from '@env';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  const onAuthStateChanged = async authUser => {
    if (authUser) {
      const fireStoreUser = await getUserFromFireStore(authUser.uid);
      if (!fireStoreUser) {
        await addUserToFireStore(authUser);
      }
      setCurrentUser(authUser);
      setLoading(false);
    } else {
      setCurrentUser(null);
      setLoading(false);
    }

    if (initializing) setInitializing(false);
  };

  const getUserFromFireStore = async userId => {
    try {
      const userDocSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      return userDocSnapshot.exists ? userDocSnapshot.data() : null;
    } catch (error) {
      console.error('Error getting user from Firestore:', error);
      return null;
    }
  };

  const addUserToFireStore = async authUser => {
    try {
      const {uid, email, displayName} = authUser;
      const user = await firestore().collection('users').doc(uid).set({
        uid,
        email,
        displayName,
        createdAt: new Date(),
      });

      return user;
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      return 3;
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setLoading(false);
    } catch (error) {
      console.error('Google sign in error:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    await auth().signOut();
    await GoogleSignin.revokeAccess();
  };

  const value = {
    initializing,
    currentUser,
    loading,
    handleGoogle,
    logout,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
