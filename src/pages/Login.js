import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SubmitButton from '../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { postLogin } from '../redux/User/userAsync-actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '../components/semantics/Span';
import Container from '../components/ui/Container';
import FormContainer from '../components/ui/FormContainer';
import SectionTitle from '../components/semantics/SectionTitle';
import Title from '../components/semantics/Title';

const Login = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: 'admin@hangover.com',
      password: 'password',
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    if (!props.userErrorLogin) {
      dispatch(postLogin(data));
    } else {
      console.log('erreur login');
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Container>
      <FormContainer>
        <Title content={'Bienvenue!'} />
        <Span content="Utilisateur" />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Utilisateur"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={false}
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        <Span content="Mot de passe" />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <View style={styles.buttonSettings}>
          <SubmitButton title={'Se connecter'} onPress={handleSubmit(onSubmit)} />
          <SubmitButton title={"S'inscrire"} onPress={goToRegister} />
        </View>
      </FormContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  buttonSettings: {
    alignItems: 'center',
},
});

const mapStateToProps = (state) => ({
  userLoading: state.userReducer.userLoadingLogin,
  userErrorLogin: state.userReducer.userError,
});

const mapActionsToProps = {
  postLogin,
};

const LoginConnected = connect(mapStateToProps, mapActionsToProps)(Login);

export default LoginConnected;
