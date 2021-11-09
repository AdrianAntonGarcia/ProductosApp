import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {AuthContext} from '../context/AuthContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const {logOut} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonHeader}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={refreshing}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              });
            }}>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      <Button
        title="logout"
        color="#5856D6"
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 10},
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  buttonHeader: {
    marginRight: 15,
  },
});
