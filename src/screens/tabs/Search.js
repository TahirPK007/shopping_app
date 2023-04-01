import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const products = useSelector(state => state);
  console.log(JSON.stringify(products.product.data));

  const navigation = useNavigation();

  const [search, setsearch] = useState('');
  const [olddata, setolddata] = useState(products.product.data);
  const [searchedlist, setsearchedlist] = useState(olddata);

  const filterdata = txt => {
    let newdata = olddata.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setsearchedlist(newdata);
    console.log(newdata);
  };

  return (
    <View style={styles.container}>
      <Header title={'Search Items'} />
      <View style={styles.searchview}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.icon}
            source={require('../../images/search.png')}
          />
          <TextInput
            style={styles.input}
            placeholder="Search Item Here..."
            value={search}
            onChangeText={value => {
              setsearch(value);
              filterdata(value);
            }}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setsearch('');
              filterdata('')
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          data={searchedlist}
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchview: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {
    width: '80%',
    marginLeft: 10,
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
