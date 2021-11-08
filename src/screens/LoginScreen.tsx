import React, {useContext} from 'react';
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
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn} = useContext(AuthContext);
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    signIn({correo: email, password});
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Background />

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={loginStyles.formContainer}>
            <WhiteLogo />

            <Text style={loginStyles.title}>Login</Text>
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
              onSubmitEditing={() => onLogin()}
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
                onPress={() => onLogin()}>
                <Text style={loginStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={loginStyles.newUserContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
