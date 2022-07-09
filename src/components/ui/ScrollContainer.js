import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ScrollView style={[styles.container, this.props.noPadding ? {padding: 0, paddingTop: 0} : {padding: 20, paddingTop: 50} ]}>{this.props.children}</ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    minHeight: '100%',
    color: '#fff',
  },
});

export default ScrollContainer;
