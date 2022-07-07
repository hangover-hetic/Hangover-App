import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import SubmitButton from '../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { postRegister } from '../redux/User/userAsync-actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '../components/semantics/Span';
import Container from '../components/ui/Container';

const Register = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      country: '',
    },
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (props.loadingRegister) {
      navigation.navigate('LoginConnected');
      dispatch(postRegister(data));
    } else {
      console.log('Les données ne sont pas bonnes');
    }
  };

  return (
    <>
      <Container>
        <View style={styles.inputContainer}>
          <Span content="First Name" />
          <Controller
            control={control}
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
            name="firstName"
            rules={{ required: true }}
          />

          <Span content="Last Name" />
          <Controller
            control={control}
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
            name="lastName"
            rules={{ required: true }}
          />

          <Span content="Email" />
          <Controller
            control={control}
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
            name="email"
            rules={{ required: true }}
          />

          <Span content="Password" />
          <Controller
            control={control}
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
            name="password"
            rules={{ required: true }}
          />

          <Span content="Phone" />
          <Controller
            control={control}
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
            name="phone"
            rules={{ required: true }}
          />

          <Span content="address" />
          <Controller
            control={control}
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
            name="address"
            rules={{ required: true }}
          />

          <Span content="Country" />
          <Controller
            control={control}
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
            name="country"
            rules={{ required: true }}
          />
          <View style={styles.buttonSettings}>
            <SubmitButton title={'Submit'} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </Container>
    </>
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
  inputContainer: {
    backgroundColor: '#202020',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonSettings: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  //Connection aux événements du store redux
  loadingRegister: state.userReducer.userLoadingRegister,
});

const mapActionsToProps = {
  //Obligatoire pour pouvoir utiliser notre fonction custom du call api
  postRegister,
};

const RegisterConnected = connect(
  //La connxion principal au store reduc se fait par ici
  mapStateToProps,
  mapActionsToProps
)(Register);

export default RegisterConnected;
