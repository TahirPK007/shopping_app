import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Checkoutlayout = ({total, items}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={{fontWeight: '600', fontSize: 18}}>(Items:{items})</Text>
        <Text style={{fontWeight: '600', fontSize: 22}}>Total: ${total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={{color: 'white'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkoutlayout;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: '80%',
    height: '60%',
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
