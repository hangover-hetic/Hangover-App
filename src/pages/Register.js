import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import SubmitButton from '../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { postRegister } from '../redux/User/userAsync-actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '../components/semantics/Span';
import Container from '../components/ui/Container';
import FormContainer from '../components/ui/FormContainer';
import Title from '../components/semantics/Title';
import ErrorText from '../components/semantics/ErrorText';

class Register extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = (data) => {
    if (!this.props.userErrorRegister) {
      this.props.postRegister(data);
    } else {
      console.log('erreur login')
    }
  };

  render() {
    return (
      <Container>
        <FormContainer>
          <Title content={'Inscription'} />

          {this.props.userFailRegister && <ErrorText content="Données mauvaises, réessayer"/>}

          <Span content="Nom" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
              />
            )}
            rules={{ required: true }}
            name="firstName"
          />
          {this.props.errors.firstName && <Text style={styles.errorText} >Ce champ est requis</Text>}

          <Span content="Prénom" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
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
              <TextInput
                style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
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
              <TextInput
                style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={true}
              />
            )}
            rules={{ required: true }}
            name="password"
          />
          {this.props.errors.password && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Téléphone" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="phone"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
              />
            )}
            rules={{ required: true }}
            name="phone"
          />
          {this.props.errors.phone && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Adresse" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
              />
            )}
            rules={{ required: true }}
            name="address"
          />
          {this.props.errors.address && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <Span content="Pays" />
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Country"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={false}
              />
            )}
            rules={{ required: true }}
            name="country"
          />
          {this.props.errors.country && <Text style={styles.errorText}>Ce champ est requis</Text>}

          <View style={styles.buttonSettings}>
            <SubmitButton title={"S'inscrire"} onPress={this.props.handleSubmit(this.onSubmit)} />
          </View>
        </FormContainer>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: '#202020',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonSettings: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red'
  }
});

const RegisterHookForm = (props) => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors }} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      country: '',
    },
  })

  const navigation = useNavigation();

  return <Register
    {...props}
    handleSubmit={handleSubmit}
    control={control}
    errors={errors}
    navigation={navigation}
  />
}

const mapStateToProps = (state) => ({
  //Connection aux événements du store redux
  loadingRegister: state.user.userLoadingRegister,
  userErrorRegister : state.user.userRegisterError
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
