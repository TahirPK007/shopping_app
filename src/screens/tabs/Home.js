import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/slices/productSlice';
const Home = () => {
  const navigation = useNavigation();
  const [products, setproducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setproducts(json);
        dispatch(addProducts(json));
      });
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/cart.png')}
        title={'Grocery App'}
        onClickLefIcon={() => {
          navigation.openDrawer();
        }}
      />
      <FlatList
        data={products}
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
                <Text style={styles.price}>{'$' + item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;

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
});
