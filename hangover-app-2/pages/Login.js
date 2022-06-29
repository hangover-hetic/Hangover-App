import React, {useEffect} from 'react'
import { 
    Text, 
    View,
    TextInput,
    StyleSheet
}                         from 'react-native';
import SubmitButton       from '../components/customButton';
import { 
    useForm, 
    Controller 
}                         from 'react-hook-form';
import { postLogin }      from '../redux/User/userAsync-actions';
import Link               from 'react-router-native'
import { connect }        from 'react-redux';


const Login = (props) => {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        props.postLogin(data)
    }

    useEffect(() => {
        
    });

    return <>
        <View style={styles.inputContainer}>
            <Text>Username</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        secureTextEntry={false} 
                    />
                )}
                name="userName"
                rules={{ required: true }}
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
                rules={{ required: true }}
            />

            <SubmitButton 
                title={"Submit"}
                onPress={handleSubmit(onSubmit)}
            />
           
        </View>
    </>
}

const mapStateToProps = ( state ) => ({
    userLoading : state
})

const mapActionsToProps = {
    postLogin
}

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
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
  });

const LoginConnected = connect(
    mapStateToProps,
    mapActionsToProps
)(Login);

export default LoginConnected;
