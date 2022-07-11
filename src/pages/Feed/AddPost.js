import { Component } from 'react';
import Container from '../../components/ui/Container';
import Title from '../../components/semantics/Title';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paragraph from '../../components/semantics/Paragraph';
import { getMediaIri, uploadMedia } from '../../services/media';
import request from '../../services/request';
import { connect } from 'react-redux';
import { FEED_HOME_ROUTE } from './routes';
import Toast from 'react-native-root-toast';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
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

  async postImage() {
    const { image } = this.state;
    if (!image) return;
    try {
      const manipResult = await manipulateAsync(image.uri, [], {
        compress: 0.5,
        format: SaveFormat.JPEG,
      });
      console.log(manipResult);
      const { data: media } = await uploadMedia(manipResult);
      console.log(media);
      if (!media.contentUrl) return;
      const { actualFestivalId, navigation } = this.props;
      const mediaIri = getMediaIri(media.id);
      await request.post(`/festivals/${actualFestivalId}/posts`, {
        media: mediaIri,
      });
      navigation.navigate(FEED_HOME_ROUTE);
    } catch (e) {
      Toast.show('Error : ' + e.response.data);
    }
  }

  render() {
    const { image } = this.state;
    return (
      <Container>
        <Title content="Poster" />
        <View style={{ justifyContent: 'center' }}>
          <Pressable
            onPress={this.pickImage.bind(this)}
            style={{ flexDirection: 'row', alignItems: 'center', width: 300 }}
          >
            <Paragraph content="Pick from gallery" styles={{ marginRight: 10 }} />
            <Ionicons name="folder" size={50} color="white" />
          </Pressable>
          <Pressable
            onPress={this.takePicture.bind(this)}
            style={{ flexDirection: 'row', alignItems: 'center', width: 300 }}
          >
            <Paragraph content="Take a picture" styles={{ marginRight: 10 }} />
            <Ionicons name="camera" size={50} color="white" />
          </Pressable>
          {image ? (
            <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />
          ) : (
            <View style={{ width: 300, height: 300, backgroundColor: 'grey' }} />
          )}
          <Pressable
            style={{
              backgroundColor: 'grey',
              color: 'white',
              marginTop: 10,
              width: 100,
              padding: 10,
            }}
            onPress={this.postImage.bind(this)}
          >
            <Paragraph content="Poster" styles={{ textAlign: 'center' }} />
          </Pressable>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  actualFestivalId: state.festivalReducer.actualFestival.id,
});

export default connect(mapStateToProps)(AddPost);
