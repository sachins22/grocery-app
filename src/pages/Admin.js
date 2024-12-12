import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Admin({ products, setProducts }) {
  const navigation = useNavigation();

  // Handle price change and save it
  const handleChangePrice = (id, newPrice) => {
    if (!newPrice || isNaN(newPrice)) return; // Ensure newPrice is valid

    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, price: parseFloat(newPrice) } : product
    );

    setProducts(updatedProducts); // Update state
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder={`Price: $${item.price.toFixed(2)}`}
        onChangeText={newPrice => handleChangePrice(item.id, newPrice)}
        defaultValue={item.price.toString()} // Keep initial price
      />
    </View>
  );

  const navigateToCustomer = () => {
    navigation.navigate('Costmer');
  };

  useEffect(() => {
    // Any initial actions without AsyncStorage can go here if needed
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable style={styles.button} onPress={navigateToCustomer}>
        <Text style={styles.buttonText}>Go to Customer Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor:"white",
    justifyContent:"center",
    // alignItems:"center"
  },
  title: {
    marginTop:150,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    // marginTop:100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '40%',
  },
  button: {
    backgroundColor: '#EC6F16FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
