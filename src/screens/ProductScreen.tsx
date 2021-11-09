import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({
  navigation,
  route: {
    params: {id, name},
  },
}: Props) => {
  useEffect(() => {
    navigation.setOptions({headerTitle: name ? name : 'Nuevo Producto'});
  }, []);
  return (
    <View>
      <Text>
        {id} - {name}
      </Text>
    </View>
  );
};
