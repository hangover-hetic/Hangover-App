
import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import SubmitButton from '../components/CustomButton';
import {useForm, Controller,} from 'react-hook-form';
import {postLogin} from '../redux/User/userAsync-actions';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Span from '../components/semantics/Span';
import Container from '../components/ui/Container';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

     onSubmit(data){
        if (this.props.userError) {
            this.props.postLogin(data);
            this.props.navigation.navigate("Homepage")
        } else {
            console.log("information pas valide")
        }
    };

    goToRegister = () => {
        this.props.navigation.navigate("Register") 
    }

    render() {
        return <>
            <Container>
                <View style={styles.inputContainer}>
                    <Span content='Username'/>
                    <Controller 
                        control={this.props.control} 
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
                    <Span content='Password'/>
                    <Controller 
                        control={this.props.control} 
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
                    <View style={styles.buttonSettings}>
                        <SubmitButton 
                            title={"Submit"} 
                            onPress={this.props.handleSubmit(this.onSubmit)}
                        />
                        <SubmitButton 
                            title={"Create an account"} 
                            onPress={this.goToRegister}
                        /> 
                    </View>
                </View>
            </Container>
        </>;
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
});

const LoginHookForm = (props) => {
    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const  navigation = useNavigation();

    return <Login
        {...props}
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        navigation={navigation}
    />
}

const mapStateToProps = (state) => ({
    userLoading : state.user.userLoadingLogin,
    userError   : state.user.userError
});

const mapActionsToProps = {
  postLogin,
};

const LoginConnected = connect(
    mapStateToProps,
    mapActionsToProps,
)(LoginHookForm);

export default LoginConnected;
