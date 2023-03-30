import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/menu.png')}
        rightIcon={require('../images/cart.png')}
        title={'Grocery App'}
      />
      <View style={styles.bottomview}>
        <TouchableOpacity style={styles.bottomtab}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/cart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/home.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomview: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomtab: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomtabicon: {
    width: 24,
    height: 24,
  },
});
