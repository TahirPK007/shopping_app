import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput style={styles.input} placeholder="Enter Your Email" />
      <TextInput style={styles.input} placeholder="Enter Your Password" />
      <CustomButton
        bg={'goldenrod'}
        title={'Sign Up'}
        color={'white'}
        onClick={() => {}}
      />
      <Text
        style={styles.logintxt}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Sign Up
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  logintxt: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
