import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const Askforloginmodal = ({
  modalvisible,
  onClickLogin,
  onClickSignup,
  onClose,
}) => {
  return (
    <Modal visible={modalvisible} transparent>
      <View style={styles.modalview}>
        <View style={styles.mainview}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.btntxt}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onClickSignup();
            }}>
            <Text style={styles.btntxt}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearbtn}
            onPress={() => {
              onClose();
            }}>
            <Image
              source={require('../images/clear.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Askforloginmodal;
const styles = StyleSheet.create({
  modalview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainview: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 200,
    width: '90%',
  },
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  clearbtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});
