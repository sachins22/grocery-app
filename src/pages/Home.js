import { Button, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Home({ products, setProducts }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const adminKey = '191922';

  function AdminPage() {
    if (password === adminKey) {
      navigation.navigate('Admin', { products, setProducts });
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  }

  function handleCustomerSubmit() {
    navigation.navigate('Costmer');
  }

  return (
    <>
      <ImageBackground source={require('../../assets/images/back.png')} style={styles.backImg}>
        <View style={styles.lay}></View>

        <Animated.Text entering={FadeInUp.delay(800).springify()} style={styles.htext}>
          Hello,
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.Con}>
          <Pressable style={styles.Button} onPress={() => setModalVisible(true)}>
            <Text style={styles.Buttontext}>Admin</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInLeft.delay(400).springify()} style={styles.Con1}>
          <Pressable style={styles.Button} onPress={handleCustomerSubmit}>
            <Text style={styles.Buttontext}>Customer</Text>
          </Pressable>
        </Animated.View>
      </ImageBackground>

      {/* Admin Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Admin Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Admin Password"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={styles.modalButton} onPress={AdminPage}>
              <Text style={styles.Buttontext}>Submit</Text>
            </Pressable>
            <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Styles remain unchanged...


const styles = StyleSheet.create({
  backImg: {
    flex: 1,
  },
  lay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(144, 238, 144, 0.7)',
  },
  Con: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  Con1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  htext: {
    marginTop: 110,
    marginLeft: 15,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#2AA3DCFF',
  },
  Button: {
    width: '40%',
    height: 60,
    borderRadius: 25,
    backgroundColor: '#EC6F16FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  Buttontext: {
    fontSize: 20,
    color: '#fff',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#EC6F16FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalClose: {
    marginTop: 10,
    padding: 10,
  },
  closeText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
