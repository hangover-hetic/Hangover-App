import React, { useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import SubmitButton from '~/components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { postLogin } from '~/redux/User/userAsync-actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '~/components/semantics/Span';
import Container from '~/components/ui/Container';
import FormContainer from '~/components/ui/FormContainer';
import Title from '~/components/semantics/Title';
import ErrorText from '~/components/semantics/ErrorText';
import { REGISTER_ROUTE } from './routes';
import Input from '../../components/ui/Input';
import WhiteSpan from '../../components/semantics/WhiteSpan';
import Paragraph from '../../components/semantics/Paragraph';

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

          <WhiteSpan content="Utilisateur" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="Utilisateur"
                onBlur={onBlur}
                defaultValue={value}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          {this.props.errors.username && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <WhiteSpan content="Mot de passe" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {this.props.errors.password && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <View style={styles.buttonSettings}>
            <SubmitButton title={'Se connecter'} onPress={this.props.handleSubmit(this.onSubmit)} />
          </View>
          <Pressable
            onPress={() => this.props.navigation.navigate(REGISTER_ROUTE)}
            style={{ marginVertical: 10 }}
          >
            <Paragraph
              content="Pas de compte ? Inscrivez-vous"
              styles={{ textDecorationLine: 'underline', marginVertical: 20, textAlign: 'center' }}
            />
          </Pressable>
        </FormContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
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
      username: 'mallet.bertrand@yahoo.fr',
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
