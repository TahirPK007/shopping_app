import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Home from './tabs/Home';
import User from './tabs/User';
import Notification from './tabs/Notification';
import Wishlist from './tabs/Wishlist';
import Search from './tabs/Search';

const HomeScreen = () => {
  const [selectedtab, setselectedtab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedtab == 0 ? (
        <Home />
      ) : selectedtab == 1 ? (
        <Search />
      ) : selectedtab == 2 ? (
        <Wishlist />
      ) : selectedtab == 3 ? (
        <Notification />
      ) : (
        <User />
      )}
      <View style={styles.bottomview}>
        <TouchableOpacity
          style={styles.bottomtab}
          onPress={() => {
            setselectedtab(0);
          }}>
          <Image
            style={styles.bottomtabicon}
            source={
              selectedtab == 0
                ? require('../images/home_fill.png')
                : require('../images/home.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomtab}
          onPress={() => {
            setselectedtab(1);
          }}>
          <Image
            style={styles.bottomtabicon}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomtab}
          onPress={() => {
            setselectedtab(2);
          }}>
          <Image
            style={styles.bottomtabicon}
            source={selectedtab == 2
              ? require('../images/wish_fill.png')
              : require('../images/wish.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomtab}
          onPress={() => {
            setselectedtab(3);
          }}>
          <Image
            style={styles.bottomtabicon}
            source={selectedtab == 3
                ? require('../images/noti_fill.png')
                : require('../images/noti.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomtab}
          onPress={() => {
            setselectedtab(4);
          }}>
          <Image
            style={styles.bottomtabicon}
            source={selectedtab == 4
              ? require('../images/user_fill.png')
              : require('../images/user.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

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
