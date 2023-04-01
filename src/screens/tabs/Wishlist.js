import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';

const Wishlist = () => {
  const items = useSelector(state => state.wishlist);
  const [wishlistitems, setwishlistitems] = useState(items.data);
  console.log(JSON.stringify(items));
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title={'Wishlist Items'} />
      <FlatList
        data={wishlistitems}
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

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
