import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SubmitButton from '../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { postLogin } from '../redux/User/userAsync-actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '../components/semantics/Span';
import Container from '../components/ui/Container';

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
      username: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    if (props.userErrorLogin) {
      dispatch(postLogin(data));
      navigation.navigate('HomepageConnected');
    } else {
      console.log('information pas valide');
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <Container>
        <View style={styles.inputContainer}>
          <Span content="Username" />
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
            name="username"
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
          <View style={styles.buttonSettings}>
            <SubmitButton title={'Submit'} onPress={handleSubmit(onSubmit)} />
            <SubmitButton title={'Create an account'} onPress={goToRegister} />
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
  userLoading: state.userReducer.userLoadingLogin,
  userErrorLogin: state.userReducer.userError,
});

const mapActionsToProps = {
  postLogin,
};

const LoginConnected = connect(mapStateToProps, mapActionsToProps)(Login);

export default LoginConnected;
