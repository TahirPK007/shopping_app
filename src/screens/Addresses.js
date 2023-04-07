import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {deleteAddress} from '../redux/slices/addressSlice';

const Addresses = () => {
  const navigation = useNavigation();
  const addresslist = useSelector(state => state.address);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(addresslist);
  }, [isFocused]);

  const defaultaddress = async item => {
    await AsyncStorage.setItem(
      'myaddress',
      '' + item.city + ',' + item.state + ',' + item.pincode + ',' + item.type,
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'My Addresses'}
        onClickLefIcon={() => {
          navigation.goBack();
        }}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Addaddress', {type: 'new'});
        }}>
        <Text style={{fontSize: 30, color: 'white'}}>+</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={addresslist.data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',

                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderWidth: 1,
                  marginTop: 10,
                  paddingLeft: 20,
                  paddingTop: 20,
                  paddingBottom: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  defaultaddress(item);
                }}>
                <Text style={styles.state}>{'Province: ' + item.state}</Text>
                <Text style={styles.state}>{'City: ' + item.city}</Text>
                <Text style={styles.state}>{'Pincode: ' + item.pincode}</Text>
                <Text
                  style={[
                    styles.state,
                    {
                      position: 'absolute',
                      right: 20,
                      top: 20,
                      backgroundColor: 'gray',
                      padding: 10,
                      borderRadius: 10,
                      fontSize: 15,
                    },
                  ]}>
                  {item.type}
                </Text>
                <View style={styles.bottomview}>
                  <TouchableOpacity
                    style={[styles.bottomicon, {marginRight: 15}]}
                    onPress={() => {
                      navigation.navigate('Addaddress', {
                        type: 'edit',
                        data: item,
                      });
                    }}>
                    <Image
                      source={require('../images/edit.png')}
                      style={styles.bottomicon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bottomicon}
                    onPress={() => {
                      dispatch(deleteAddress(item.id));
                    }}>
                    <Image
                      source={require('../images/delete.png')}
                      style={styles.bottomicon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Addresses;

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
  state: {
    color: 'black',
    fontSize: 20,
  },
  bottomview: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomicon: {
    width: 24,
    height: 24,
  },
});
