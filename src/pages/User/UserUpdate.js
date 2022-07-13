import React from 'react'
import { 
  useForm, 
  Controller 
} from 'react-hook-form';
import BasicBigText from '../../components/semantics/BasicBigText';
import Container from '../../components/ui/Container';
import FormContainer from '../../components/ui/FormContainer';
import { 
  TextInput,
  Pressable 
} from 'react-native';
import SubmitButton from '../../components/CustomButton';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paragraph from '../../components/semantics/Paragraph';
import BasicText from '../../components/semantics/BasicText';
import { connect } from 'react-redux';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props)

    this.pickImage = this.pickImage.bind(this);
  }

  componentDidMount() {
    console.log(this.props.actualUser.id)
  }

  async pickImage() {
    await console.log("bonjour")
  }

  onSubmit = (data) => {
    console.log()
  }

  render() {
    return (
      <Container>
        <FormContainer>
          <BasicBigText content="Modifier mes informations" />

          <View style={styles.spaceBetween}/>

          <BasicText content="Prénom"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="firstName"
            rules={{ required: true }}
          />
          
          <View style={styles.spaceBetween}/>

          <BasicText content="Nom"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="lastName"
            rules={{ required: true }}
          />

          <View style={styles.spaceBetween}/>

          <BasicText content="Email"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="email"
            rules={{ required: true }}
          />

          <View style={styles.spaceBetween}/>

          <BasicText content="Mot de passe"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="password"
            rules={{ required: true }}
          />

          <View style={styles.spaceBetween}/>

          <BasicText content="Portable"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Portable"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="phone"
            rules={{ required: true }}
          />

          <View style={styles.spaceBetween}/>

          <BasicText content="Adresse"/>
          <Controller
            control={this.props.control}
            render={({ field: { onChange, onBlur, value}}) => (
              <View style={styles.headerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Adresse"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholderTextColor="#9D9D9D"
                />
              </View>
            )}
            name="address"
            rules={{ required: true }}
          />

          <View style={styles.spaceBetween}/>

          <BasicText content="Pays"/>

          <View style= {styles.placeholderCustom}>
            <Controller
              control={this.props.control}
              render={({ field: { onChange, onBlur, value}}) => (
                <View style={styles.headerInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Pays"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    
                    placeholderTextColor="#9D9D9D"
                  />
                </View>
              )}  
              name="country"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.spaceBetween}/>

          <Pressable
            onPress={this.pickImage}
            style={{ flexDirection: 'row', alignItems: 'center', width: 300 }}
          >
            <Ionicons name='person-circle-outline' size={40} color='white' />
            <Paragraph content='Modifier ma photo de profil' styles={{ marginLeft: 10 }} />
          </Pressable>

          <View style={styles.buttonSettings}>
            <SubmitButton title={'Enregistrer'} onPress={this.props.handleSubmit(this.onSubmit)} />
          </View>
        </FormContainer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 25,
    width: 300,
    paddingHorizontal: 5,
    marginBottom: 5,
    fontSize: 11,
    color: 'white'
  },
  spaceBetween: {
    marginBottom: 10,
  },
  headerInput: {
    borderBottomColor: '#9D9D9D',
    borderBottomWidth: 2,
  },
  buttonSettings: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  placeholderCustom: {
    color : '#9D9D9D',
  }
});

const UserUpdateHookForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: props.actualUser.firstName,
      lastName: props.actualUser.lastName,
      email: props.actualUser.email,
      phone: props.actualUser.phone,
      address: props.actualUser.address,
      country: props.actualUser.country
    }
  })

  return <UserUpdate
    {...props}
    handleSubmit={handleSubmit}
    control={control}
    errors={errors}
  />
}

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
});

const UserUpdateConnected = connect(mapStateToProps)(UserUpdateHookForm);

export default UserUpdateConnected;
