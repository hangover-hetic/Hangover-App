import React from "react";
import {connect} from "react-redux";
import FormContainer from "../../components/ui/FormContainer";
import Title from "../../components/semantics/Title";
import ErrorText from "../../components/semantics/ErrorText";
import Span from "../../components/semantics/Span";
import {Controller, useForm} from "react-hook-form";
import {StyleSheet, Text, TextInput, View} from "react-native";
import SubmitButton from "../../components/ui/SubmitButton";
import Container from "../../components/ui/Container";
import {useNavigation} from "@react-navigation/native";
import {actualUser} from "../../redux/User/userActions";
import SectionTitle from "../../components/semantics/SectionTitle";
import Paragraph from "../../components/semantics/Paragraph";
import {postLogin} from "../../redux/User/userAsync-actions";

class AccountUpdate extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (data) => {
        this.props.updateUser(data);
    };


    render() {
        const {actualUser} = this.props;
        return (
            <>
                <Container>
                    {actualUser === null ? (
                        <Paragraph content="loading"/>
                    ) : (
                        <FormContainer>
                            <SectionTitle content={'Modifier mes informations'}/>
                            <Span content="Nom"/>
                            <Controller
                                control={this.props.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nom"
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry={false}
                                    />
                                )}
                                name="firstName"
                                rules={{required: false}}
                            />
                            <Span content="Prénom"/>
                            <Controller
                                control={this.props.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Prénom"
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry={false}
                                    />
                                )}
                                name="lastName"
                                rules={{required: false}}
                            />
                            <Span content="Email"/>
                            <Controller
                                control={this.props.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry={false}
                                    />
                                )}
                                name="email"
                                rules={{required: false}}
                            />
                            <Span content="Mot de passe"/>
                            <Controller
                                control={this.props.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mot de passe"
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry
                                    />
                                )}
                                name="password"
                                rules={{required: false}}

                            />
                            <Span content="Confirmer mot de passe"/>
                            <Controller
                                control={this.props.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mot de passe"
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry
                                    />
                                )}
                                name="password"
                                rules={{required: false}}

                            />

                            <View style={styles.buttonSettings}>
                                <SubmitButton title={'Enregistrer'} onPress={this.props.handleSubmit(this.onSubmit)}/>
                            </View>
                        </FormContainer>
                    )}
                </Container>
            </>
        )

    }

}

const AccountHookForm = (props) => {
    const {
        setValue,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            firstName: actualUser.firstName,
            lastName: actualUser.lastName,
            email: actualUser.email,
            confirmPassword: '',
            password: '',
        },
    });

    const navigation = useNavigation();

    return (
        <AccountUpdate
            {...props}
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            navigation={navigation}
        />
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
    buttonSettings: {
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});

const mapStateToProps = (state) => ({
    actualUser: state.user.actualUser,
});

const mapActionsToProps = {
    postLogin,
};

export default connect(mapStateToProps, mapActionsToProps)(AccountHookForm);
