import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {LoadingScreen} from './LoadingScreen';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';
interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({
  navigation,
  route: {
    params: {id = '', name = ''},
  },
}: Props) => {
  const {categories, isLoading} = useCategories();

  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductsContext);

  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    console.log(product);
    setFormValue({
      _id: product._id,
      categoriaId: product.categoria._id,
      nombre: product.nombre,
      img: product.img ? product.img : '',
    });
  };

  const saveOrUpdate = () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      addProduct(tempCategoriaId, nombre);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: nombre ? nombre : 'Sin Nombre',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  if (isLoading) return <LoadingScreen></LoadingScreen>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        {/* Picker / Selector */}
        <Text style={styles.label}>Seleccione la categoría:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>
        <Button title="Guardar" color="#5856D6" onPress={saveOrUpdate} />
        {id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Cámara" onPress={() => {}} color="#5856D6" />
            <View style={{width: 10}} />
            <Button title="Galería" onPress={() => {}} color="#5856D6" />
          </View>
        )}
        {/* <Text>{JSON.stringify(form, null, 5)}</Text> */}
        {img.length > 0 && (
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {fontSize: 18},
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
