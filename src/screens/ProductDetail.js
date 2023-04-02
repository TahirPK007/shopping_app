import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {additemtowishlist} from '../redux/slices/wishlistSlice';
import {additemtocart} from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLefIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.price, {color: 'black'}]}>Price:</Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
          <View style={styles.qtyview}>
            <Text style={styles.price}>{}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setqty(qty - 1);
                }
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setqty(qty + 1);
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wishlistbtn}
          onPress={() => {
            dispatch(additemtowishlist(route.params.data));
          }}>
          <Image source={require('../images/wish.png')} style={styles.icon} />
        </TouchableOpacity>

        <CustomButton
          bg={'rgba(205,189,19,0.66)'}
          title={'Add To Cart'}
          color={'white'}
          onClick={() => {
            console.log(route.params.data);
            dispatch(
              additemtocart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              }),
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  price: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  wishlistbtn: {
    position: 'absolute',
    right: 20,
    top: 300,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
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
});
