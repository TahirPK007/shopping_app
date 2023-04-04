import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  additemtocart,
  reduceitemfromcart,
  removeitemfromcart,
} from '../redux/slices/cartSlice';
import Checkoutlayout from '../common/Checkoutlayout';

const Cart = () => {
  const items = useSelector(state => state.cart);
  const [cartitems, setcartitems] = useState([]);

  
  console.log(JSON.stringify(items));
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const gettotal = () => {
    let total = 0;
    cartitems.map(item => {
      total = total+item.qty * item.price;
    });
    return total.toFixed(0);
  };

  useEffect(() => {
    setcartitems(items.data);
  }, [items]);

  return (
    <View style={styles.container}>
      <Header title={'Cart Items'} />
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
      {cartitems.length < 1 && (
        <View style={styles.noitems}>
          <Text>No Items In Cart</Text>
        </View>
      )}
      {cartitems.length > 0 && (
        <Checkoutlayout items={cartitems.length} total={gettotal()} />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
