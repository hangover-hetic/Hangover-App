import React        from 'react'
import { 
    Text,
    View,
    TextInput,
    StyleSheet
}                   from 'react-native';
import SubmitButton from '../components/customButton';
import { 
    useForm, 
    Controller 
}                         from 'react-hook-form';

const Register = () => {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        console.log(data);
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
                name="Email"
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

export default Register;
