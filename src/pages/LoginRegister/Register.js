import React from 'react';
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import SubmitButton from '../../components/ui/SubmitButton';
import { useForm, Controller } from 'react-hook-form';
import { postRegister } from '~/redux/User/userAsync-actions';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '~/components/semantics/Span';
import FormContainer from '~/components/ui/FormContainer';
import Title from '~/components/semantics/Title';
import ErrorText from '~/components/semantics/ErrorText';
import ScrollContainer from '~/components/ui/ScrollContainer';
import { LOGIN_ROUTE, REGISTER_ROUTE } from './routes';
import Input from '../../components/ui/Input';
import Paragraph from '../../components/semantics/Paragraph';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (data) => {
    if (!this.props.userErrorRegister) {
      console.log(data);
      this.props.postRegister(data);
    } else {
      console.log('erreur login');
    }
  };

  render() {
    return (
      <ScrollContainer>
        <FormContainer>
          <Title content={'Inscription'} />

          {this.props.userFailRegister && <ErrorText content="Données mauvaises, réessayer" />}

          <Span content="Nom" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="Dupont"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
              />
            )}
            rules={{ required: true }}
            name="firstName"
          />
          {this.props.errors.firstName && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Prénom" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="Catherine"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
              />
            )}
            rules={{ required: true }}
            name="lastName"
          />
          {this.props.errors.lastName && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Email" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="catherine.dupont@gmail.com"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
                keyboardType="email-address"
              />
            )}
            rules={{ required: true }}
            name="email"
          />
          {this.props.errors.email && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Mot de passe" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
                secureTextEntry
              />
            )}
            rules={{ required: true }}
            name="password"
          />
          {this.props.errors.password && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <View style={styles.buttonSettings}>
            <SubmitButton title={"S'inscrire"} onPress={this.props.handleSubmit(this.onSubmit)} />
            <Pressable onPress={() => this.props.navigation.navigate(LOGIN_ROUTE)}>
              <Paragraph
                content="Déjà un compte ? Connectez-vous "
                styles={{
                  textDecorationLine: 'underline',
                  marginVertical: 30,
                  textAlign: 'center',
                }}
              />
            </Pressable>
          </View>
        </FormContainer>
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
  },
  buttonSettings: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

const RegisterHookForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: 'Catherine',
      lastName: 'Mougin',
      email: 'test@test.com',
      password: 'pwdret',
      // phone: '',
      // address: '',
      // country: '',
    },
  });

  const navigation = useNavigation();

  return (
    <Register
      {...props}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  //Connection aux événements du store redux
  loadingRegister: state.user.userLoadingRegister,
  userErrorRegister: state.user.userRegisterError,
});

const mapActionsToProps = {
  //Obligatoire pour pouvoir utiliser notre fonction custom du call api
  postRegister,
};

const RegisterConnected = connect(
  //La connxion principal au store reduc se fait par ici
  mapStateToProps,
  mapActionsToProps
)(RegisterHookForm);

export default RegisterConnected;
