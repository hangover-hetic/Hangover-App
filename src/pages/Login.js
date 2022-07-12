import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
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
import ErrorText from '../components/semantics/ErrorText';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (data) => {
    this.props.postLogin(data);
  };

  goToRegister = () => {
    this.props.navigation.navigate('Inscription');
  };

  render() {
    return (
      <Container>
        <FormContainer>
          <Title content={'Bienvenue!'} />

          {this.props.userErrorLogin && <ErrorText content="Données mauvaises, réessayer" />}

          <Span content="Utilisateur" />
          <Controller
            control={this.props.control}
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
          {this.props.errors.username && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Mot de passe" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {this.props.errors.password && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <View style={styles.buttonSettings}>
            <SubmitButton title={'Se connecter'} onPress={this.props.handleSubmit(this.onSubmit)} />
          </View>
        </FormContainer>
      </Container>
    );
  }
}

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
  errorText: {
    color: 'red',
  },
});

const LoginHookForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: 'alfred.charpentier@petitjean.fr',
      password: 'password',
    },
  });

  const navigation = useNavigation();

  return (
    <Login
      {...props}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  userLoading: state.user.userLoadingLogin,
  userErrorLogin: state.user.userLoginError,
  userSuccessLogin: state.user.userLoginSuccess,
});

const mapActionsToProps = {
  postLogin,
};

const LoginConnected = connect(mapStateToProps, mapActionsToProps)(LoginHookForm);

export default LoginConnected;
