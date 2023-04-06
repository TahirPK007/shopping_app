import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addresses = () => {
  const navigation = useNavigation();
  const addresslist = useSelector(state => state.address);
  const isFocused = useIsFocused();

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
          navigation.navigate('Addaddress');
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
});
