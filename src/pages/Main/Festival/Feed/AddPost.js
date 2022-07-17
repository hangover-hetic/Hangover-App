import { Component } from 'react';
import Title from '~/components/semantics/Title';
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, TextInput, Vibration, View } from 'react-native';
import Paragraph from '~/components/semantics/Paragraph';
import { getMediaIri, uploadMedia } from '~/services/media';
import request from '~/services/request';
import { connect } from 'react-redux';
import { FEED_HOME_ROUTE } from './routes';
import Toast from 'react-native-root-toast';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Span from '~/components/semantics/Span';
import ScrollContainer from '~/components/ui/ScrollContainer';
import { AntDesign } from '@expo/vector-icons';
import Input from '~/components/ui/Input';
import SubmitButton from '~/components/ui/SubmitButton';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      message: '',
    };
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

  async takePicture() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({ aspect: [1, 1], allowsEditing: true });
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    }
  }

  async postPost() {
    const { image, message } = this.state;
    console.log(image, message);
    if (!image) return;
    try {
      const manipResult = await manipulateAsync(image.uri, [], {
        compress: 0.2,
        format: SaveFormat.JPEG,
      });
      const { data: media } = await uploadMedia(manipResult);
      console.log(media);
      if (!media.contentUrl) return;
      const { actualFestivalId, navigation } = this.props;
      const mediaIri = getMediaIri(media.id);
      await request.post(`/festivals/${actualFestivalId}/posts`, {
        media: mediaIri,
        message: message,
      });
      Vibration.vibrate();
      Toast.show('Votre post est bien posté, il est en attente de modération !');
      navigation.navigate(FEED_HOME_ROUTE);
    } catch (e) {
      Toast.show('Error : ' + e.response.data);
    }
  }

  render() {
    const { image } = this.state;
    const canPost = image !== null;
    console.log({ canPost });
    return (
      <ScrollContainer>
        <View style={{ height: 40 }} />
        <Title content="Poster" />
        <View style={{ justifyContent: 'center', marginTop: 20 }}>
          {image ? (
            <Image source={{ uri: image.uri }} style={{ width: '100%', aspectRatio: 1 }} />
          ) : (
            <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#414141' }} />
          )}
          <Pressable
            onPress={this.pickImage.bind(this)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 300,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Paragraph content="Choisir depuis la galerie" styles={{ marginRight: 10 }} />
            <AntDesign name="addfolder" size={20} color="#9D9D9D" />
          </Pressable>
          <Pressable
            onPress={this.takePicture.bind(this)}
            style={{ flexDirection: 'row', alignItems: 'center', width: 300, marginBottom: 20 }}
          >
            <Paragraph content="Prendre une photo" styles={{ marginRight: 10 }} />
            <AntDesign name="plus" size={20} color="#9D9D9D" />
          </Pressable>

          <Span content="Description" style={{ marginBottom: 10 }} />
          <Input
            placeholder="Trop de la bombe ce festival !"
            keyboardType="twitter"
            onChangeText={(value) => this.setState({ message: value })}
          />
          <View style={{ alignItems: 'center' }}>
            <SubmitButton
              title="Partager"
              onPress={this.postPost.bind(this)}
              disabled={!canPost}
              style={{ width: 200, marginTop: 20 }}
            />
          </View>
        </View>
      </ScrollContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  actualFestivalId: state.festival.actualFestival.id,
});

export default connect(mapStateToProps)(AddPost);
