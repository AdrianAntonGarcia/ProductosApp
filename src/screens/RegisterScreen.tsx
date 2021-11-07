import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {loginStyles} from '../theme/loginTheme';
import {WhiteLogo} from '../components/WhiteLogo';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from '../hooks/useForm';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    console.log({email, password, name});
    Keyboard.dismiss();
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: '#5856D6'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={loginStyles.formContainer}>
              <WhiteLogo />

              <Text style={loginStyles.title}>Registro</Text>
              <Text style={loginStyles.label}>Nombre:</Text>
              <TextInput
                placeholder="Ingrese su nombre"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="default"
                underlineColorAndroid="white"
                selectionColor="white"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'name')}
                value={name}
                style={[
                  loginStyles.inputField,
                  Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                ]}
              />
              <Text style={loginStyles.label}>Email:</Text>
              <TextInput
                placeholder="Ingrese su email"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                selectionColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'email')}
                value={email}
                style={[
                  loginStyles.inputField,
                  Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                ]}
              />
              <Text style={loginStyles.label}>Contraseña:</Text>
              <TextInput
                placeholder="******"
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                selectionColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                onChangeText={value => onChange(value, 'password')}
                onSubmitEditing={() => onRegister()}
                value={password}
                style={[
                  loginStyles.inputField,
                  Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                ]}
              />
              <View style={loginStyles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={loginStyles.button}
                  onPress={() => onRegister()}>
                  <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.replace('LoginScreen')}
                activeOpacity={0.8}
                style={loginStyles.buttonReturn}>
                <Text style={loginStyles.buttonText}>Ir al Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
