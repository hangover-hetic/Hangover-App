import { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    onChangeText: PropTypes.func,
    defaultValue: PropTypes.string,
    textContentType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
  };

  static defaultProps = {
    secureTextEntry: false,
    keyboardType: 'default',
  };

  render() {
    const {
      placeholder,
      style,
      keyboardType,
      onChangeText,
      defaultValue,
      textContentType,
      secureTextEntry,
    } = this.props;
    return (
      <TextInput
        style={[
          {
            width: '100%',
            backgroundColor: 'transparent',
            marginBottom: 5,
            borderBottomColor: '#9D9D9D',
            borderBottomWidth: 1,
            color: 'white',
          },
          style,
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        placeholderTextColor="#9D9D9D"
        selectionColor="white"
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
      />
    );
  }
}

export default Input;
