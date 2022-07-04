import React from 'react';
import {Text, View, TextInput, StyleSheet,} from 'react-native';
import SubmitButton from '../components/CustomButton';
import {useForm, Controller,} from 'react-hook-form';
import {postLogin} from '../redux/User/userAsync-actions';
import {connect, useDispatch,} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSubmit = (data) => {
        if (props.userLoading) {
            dispatch(postLogin(data));
            navigation.navigate("HomepageConnected")
        } else {
            console.log("information pas valide")
        }
    };

    const goToRegister = () => {
        navigation.navigate("Register")
    }

    return <>
        <View style={styles.inputContainer}>
            <Text>Username</Text>
            <Controller 
                control={control} 
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        style={styles.input} 
                        placeholder="Username" 
                        onBlur={onBlur} 
                        onChangeText={value => onChange(value)} 
                        value={value} 
                        secureTextEntry={false}/>
            )} 
            name="username" 
            rules={{required: true}}
        />
            <Text>Password</Text>
            <Controller 
                control={control} 
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        style={styles.input} 
                        placeholder="password" 
                        onBlur={onBlur} 
                        onChangeText={value => onChange(value)} 
                        value={value} 
                        secureTextEntry={true}
                    />
            )} 
            name="password" 
            rules={{required: true}}
        />
        {/*Laisse ce style d'intentation stp, sinon c'est illisible pour moi*/}

            <SubmitButton 
                title={"Submit"} 
                onPress={handleSubmit(onSubmit)}
            />
            <SubmitButton 
                title={"Not register ?"} 
                onPress={goToRegister}
            />
        </View>
    </>;
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
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});

const mapStateToProps = (state) => ({
    userLoading: state.userReducer.userLoadingLogin,
});

const mapActionsToProps = {
    postLogin,
};

const LoginConnected = connect(
    mapStateToProps,
    mapActionsToProps,
)(Login);

export default LoginConnected;
