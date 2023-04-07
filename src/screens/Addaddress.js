import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slices/addressSlice';
import uuid from 'react-native-uuid';

const Addaddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [type, settype] = useState(
    route.params.type == 'edit'
      ? route.params.data.type == 'home'
        ? 1
        : 2
      : 1,
  );
  const [city, setcity] = useState(
    route.params.type == 'edit' ? route.params.data.city : '',
  );
  const [state, setstate] = useState(
    route.params.type == 'edit' ? route.params.data.state : '',
  );
  const [pincode, setpincode] = useState(
    route.params.type == 'edit' ? route.params.data.pincode : '',
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={route.params.type == 'edit' ? 'Edit Address' : 'Add New Address'}
        onClickLefIcon={() => {
          navigation.goBack();
        }}
      />

      <TextInput
        style={[styles.input, {marginTop: 50}]}
        placeholder="Enter State"
        value={state}
        onChangeText={txt => setstate(txt)}
      />
      <TextInput
        style={[styles.input, {marginTop: 10}]}
        placeholder="Enter City"
        value={city}
        onChangeText={txt => setcity(txt)}
      />
      <TextInput
        style={[styles.input, {marginTop: 10}]}
        keyboardType="number-pad"
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={txt => setpincode(txt)}
      />
      <View style={styles.typeview}>
        <TouchableOpacity
          style={[
            styles.typebtn,
            {borderWidth: 0.5, borderColor: type == 1 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            settype(1);
          }}>
          <Image
            source={
              type == 1
                ? require('../images/radio_fill.png')
                : require('../images/radio.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radiotxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typebtn,
            {borderWidth: 0.5, borderColor: type == 2 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            settype(2);
          }}>
          <Image
            source={
              type == 2
                ? require('../images/radio_fill.png')
                : require('../images/radio.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radiotxt}>Office</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={'orange'}
        title={'Save Address'}
        color={'white'}
        onClick={() => {
          if (route.params.type == 'edit') {
            dispatch(
              updateAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? 'home' : 'office',
                id: route.params.data.id,
              }),
              navigation.goBack(),
            );
          } else {
            dispatch(
              addAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? 'home' : 'office',
                id: uuid.v4(),
              }),
              navigation.goBack(),
            );
          }
        }}
      />
    </View>
  );
};

export default Addaddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  typeview: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  typebtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  radio: {width: 24, height: 24},
  radiotxt: {
    marginLeft: 10,
  },
});
