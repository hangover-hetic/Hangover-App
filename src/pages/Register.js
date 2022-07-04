import React            from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet
}                       from 'react-native';
import SubmitButton     from '../components/CustomButton';
import {
    useForm,
    Controller
}                       from 'react-hook-form';
import { postRegister } from '../redux/User/userAsync-actions';
import {
    connect,
    useDispatch
}                       from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Register = (props) => {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues : {
            firstName : '',
            lastName  : '',
            email     : '',
            password  : '',
            phone     : '',
            address   : '',
            country   : '',
        }
    });

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        if (props.loadingRegister) {
            dispatch(postRegister(data))
            navigation.navigate("/Login")
            console.log(data)
        } else {
            console.log("Les données ne sont pas bonnes")
        }
        //appel de l'api
        dispatch(postRegister(data))
        console.log(data)
    }

    return <>
        <View style={styles.inputContainer}>
            <Text>First Name</Text>
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
                name="firstName"
                rules={{ required: true }}
            />

            <Text>Last Name</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    secureTextEntry={false}
                />
                )}
                name="lastName"
                rules={{ required: true }}
            />

            <Text>Email</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    secureTextEntry={false}
                />
                )}
                name="email"
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

            <Text>Phone</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style={styles.input}
                    placeholder="phone"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    secureTextEntry={false}
                />
                )}
                name="phone"
                rules={{ required: true }}
            />

            <Text>Address</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    secureTextEntry={false}
                />
                )}
                name="address"
                rules={{ required: true }}
            />

            <Text>Coutry</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    secureTextEntry={false}
                />
                )}
                name="country"
                rules={{ required: true }}
            />

            <SubmitButton
                title={"Submit"}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    </>
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

const mapStateToProps = ( state ) => ({
    //Connection aux événements du store redux
    loadingRegister : state.userReducer.userLoadingRegister
})

const mapActionsToProps = {
    //Obligatoire pour pouvoir utiliser notre fonction custom du call api
    postRegister
}

const RegisterConnected = connect(
    //La connxion principal au store reduc se fait par ici
    mapStateToProps,
    mapActionsToProps
)(Register);

export default RegisterConnected;
