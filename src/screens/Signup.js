import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [pass, setpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');
  const adduser = () => {
    firestore()
      .collection('users')
      .add({
        name: name,
        email: email,
        mobile: mobile,
        password: pass,
      })
      .then(() => {
        console.log('User added!');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={value => setname(value)}
        placeholder="Enter Your Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={value => setemail(value)}
        placeholder="Enter Your Email"
      />
      <TextInput
        style={styles.input}
        value={mobile}
        onChangeText={value => setmobile(value)}
        placeholder="Enter Your Mobile"
      />
      <TextInput
        style={styles.input}
        value={pass}
        onChangeText={value => setpass(value)}
        placeholder="Enter Your Password"
      />
      <TextInput
        style={styles.input}
        value={confirmpass}
        onChangeText={value => {
          setconfirmpass(value);
        }}
        placeholder="Enter Your Confirm Password"
      />
      <CustomButton
        bg={'goldenrod'}
        title={'Sign Up'}
        color={'white'}
        onClick={() => {
          adduser();
          navigation.navigate("Login")
        }}
      />
      <Text
        style={styles.logintxt}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Log in
      </Text>
    </View>
  );
};

export default Signup;
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
