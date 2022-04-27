import React, { useState } from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';

import {View, TextInput, Logo, Button, FormErrorMessage, LoadingIndicator} from '../components';
import { Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = values => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
  };
  return (
      <View isSafe style={styles.container}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Text style={styles.screenTitle}>Clovery<Text style={{color: Colors.pink}}>.</Text></Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name='email'
                  leftIconName='email'
                  placeholder='Enter email'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name='password'
                  leftIconName='key-variant'
                  placeholder='Enter password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType='password'
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to create a new account */}
          <Pressable
              style={styles.borderlessButtonContainer}
              borderless
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{fontFamily: 'GilroyRegular', fontWeight: 700, color: Colors.blue}}>Create a new account?</Text>
          </Pressable>
          <Pressable
              style={styles.borderlessButtonContainer}
              borderless
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={{fontFamily: 'GilroyMedium', color: Colors.blue}}>Forgot Password</Text>
          </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontFamily: 'GilroyExtraBold',
    fontWeight: 900,
    fontSize: 45,
    color: Colors.black,
    paddingTop: 20
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.orange
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.pink,
    padding: 15,
    borderRadius: 100
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'GilroyBold',
  },
  borderlessButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
