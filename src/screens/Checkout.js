import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  additemtocart,
  reduceitemfromcart,
  removeitemfromcart,
} from '../redux/slices/cartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartitems, setcartitems] = useState([]);
  const [selectedmethod, setselectedmethod] = useState(0);
  const [selectedaddress, setselectedaddress] = useState(
    'Please Select Your Address',
  );
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const gettotal = () => {
    let total = 0;
    cartitems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };

  useEffect(() => {
    setcartitems(items.data);
  }, [items]);

  const getselectedaddress = async () => {
    setselectedaddress(await AsyncStorage.getItem('myaddress'));
  };

  useEffect(() => {
    getselectedaddress();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Checkout'}
        onClickLefIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={cartitems}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.productitem}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('ProductDetail', {data: item});
                }}>
                <Image style={styles.itemimage} source={{uri: item.image}} />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 20
                      ? item.title.substring(0, 20) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.desc}>
                    {item.description.length > 40
                      ? item.description.substring(0, 40) + '...'
                      : item.description}
                  </Text>
                  <View style={styles.qtyview}>
                    <Text style={styles.price}>{'$' + item.price}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceitemfromcart(item));
                        } else {
                          dispatch(removeitemfromcart(index));
                        }
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        dispatch(additemtocart(item));
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalview}>
        <Text style={[styles.title, {marginLeft: 20}]}>Total</Text>
        <Text style={[styles.title, {marginRight: 20}]}>
          {'$' + gettotal()}
        </Text>
      </View>
      <Text style={styles.title}>Select Payment Mode</Text>
      <TouchableOpacity
        style={styles.paymentmethod}
        onPress={() => {
          setselectedmethod(0);
        }}>
        <Image
          source={
            selectedmethod == 0
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedmethod == 0 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymenttxt}>Credit Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentmethod}
        onPress={() => {
          setselectedmethod(1);
        }}>
        <Image
          source={
            selectedmethod == 1
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedmethod == 1 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymenttxt}>Debit Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentmethod}
        onPress={() => {
          setselectedmethod(2);
        }}>
        <Image
          source={
            selectedmethod == 2
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedmethod == 2 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymenttxt}>Easy Pesa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentmethod}
        onPress={() => {
          setselectedmethod(3);
        }}>
        <Image
          source={
            selectedmethod == 3
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedmethod == 3 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymenttxt}>Cash On Delivery</Text>
      </TouchableOpacity>
      <View style={styles.addressview}>
        <Text style={styles.title}>Address</Text>
        <Text
          style={[
            styles.title,
            {textDecorationLine: 'underline', color: 'blue'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>
      <Text style={[styles.title, {marginTop: 10, fontSize: 16}]}>
        {selectedaddress}
      </Text>
      <CustomButton bg={'green'} title={'Pay and order'} color={'white'} />
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: 'black',
  },
  productitem: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemimage: {
    width: 100,
    height: 100,
    resizeMode: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 5,
    fontWeight: '600',
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    borderWidth: 0.5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noitems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalview: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  paymentmethod: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
    paddingLeft: 20,
  },
  paymenttxt: {
    marginLeft: 15,
    fontSize: 16,
    color: 'black',
  },
  addressview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingRight: 20,
  },
});
