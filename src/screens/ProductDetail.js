import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLefIcon={() => {
          navigation.goBack();
        }}
      />
      <Image source={{uri: route.params.data.image}} style={styles.banner} />
      <Text style={styles.title}>{route.params.data.title}</Text>
      <Text style={styles.desc}>{route.params.data.description}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.price, {color: 'black'}]}>Price:</Text>
        <Text style={styles.price}>{'$' + route.params.data.price}</Text>
      </View>
      <TouchableOpacity style={styles.wishlistbtn}>
        <Image source={require('../images/wish.png')} style={styles.icon} />
      </TouchableOpacity>
      <CustomButton
        bg={'rgba(205,189,19,0.66)'}
        title={'Add To Cart'}
        color={'white'}
        onClick={() => {}}
      />
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
});
