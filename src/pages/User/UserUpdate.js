import React from 'react'
import { 
  useForm, 
  Controller,
} from 'react-hook-form';
import BasicBigText from '../../components/semantics/BasicBigText';
import Container from '../../components/ui/Container';
import FormContainer from '../../components/ui/FormContainer';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { 
  TextInput,
  Pressable,
  Vibration
} from 'react-native';
import SubmitButton from '../../components/CustomButton';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paragraph from '../../components/semantics/Paragraph';
import BasicText from '../../components/semantics/BasicText';
import { connect } from 'react-redux';
import { updateDataUser } from '../../redux/User/userAsync-actions';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import { 
  getMediaIri, 
  uploadMedia 
} from '../../services/media';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: null,
      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.pickImage = this.pickImage.bind(this);
  }

  async pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  }

  async onSubmit(data) {
    const { image } = this.state;
    if (!image) return;
    try {
      const manipResult = await manipulateAsync(image.uri, [], {
        compress: 0.2,
        format: SaveFormat.JPEG,
      });

      const { data: media } = await uploadMedia(manipResult);
      if (!media.contentUrl) return;
      const { actualFestivalId, navigation } = this.props;
      const mediaIri = getMediaIri(media.id);
    
      const dataWithImage = {...data, profilePicture: mediaIri}

      await this.props.updateDataUser(this.props.actualUser.id, dataWithImage)

      Vibration.vibrate();
      Toast.show('Votre post est bien posté, il est en attente de modération !');

    } catch (e) {
      Toast.show('Error : ' + e);
    }
  }

  render() {
    const { image } = this.state;
    const canPost = image !== null;
    console.log(canPost)
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
            <SubmitButton 
              title={'Enregistrer'} 
              onPress={this.props.handleSubmit(this.onSubmit)}
              disabled={!canPost}
            />
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

const mapActionsToProps = {
  updateDataUser
}

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
});

const UserUpdateConnected = connect(
  mapStateToProps, 
  mapActionsToProps
)(UserUpdateHookForm);

export default UserUpdateConnected;
