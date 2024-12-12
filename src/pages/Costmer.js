import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, Alert, TextInput } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation } from '@react-navigation/native';

export default function Costmer({ products }) {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Toggle item selection
  const toggleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Send selected items via email
  const sendEmail = async () => {
    const selectedNames = selectedItems.map((item) => `${item.name} - $${item.price.toFixed(2)}`).join('\n');

    if (selectedItems.length === 0 || !name || !address) {
      Alert.alert("Missing Information", "Please fill in your name, address, and select items before sending.");
      return;
    }

    const { status } = await MailComposer.composeAsync({
      recipients: ['ss22sachin@gmail.com'], // Replace with your email
      subject: 'Selected Grocery Items',
      body: `Name: ${name}\nAddress: ${address}\n\nHere is the list of selected grocery items:\n\n${selectedNames}`,
    });

    if (status === 'sent') {
      Alert.alert("Email Sent", "Your email with the selected items has been sent successfully!");
    } else {
      Alert.alert("Email Not Sent", "There was an issue sending your email.");
    }
    
    navigation.navigate('Home');
  };

  // Render a product card
  const renderProduct = ({ item }) => {
    const isSelected = selectedItems.includes(item);
    
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => toggleSelection(item)}
      >
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>${item.price.toFixed(2)}</Text>
        {isSelected && <Text style={styles.tick}>✔</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input1}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
      
      {/* Display Total Price */}
      <Text style={styles.totalText}>
        Total: ${calculateTotal()}
      </Text>
      
      <Button title="Purchase" onPress={sendEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCard: {
    borderColor: 'green',
  },
  cardText: {
    fontSize: 18,
  },
  tick: {
    fontSize: 20,
    color: 'green',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop:100
  },
  input1: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    // marginTop:100
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
