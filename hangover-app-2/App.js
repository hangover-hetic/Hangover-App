
import React from 'react';
import { 
  StyleSheet, 
  View 
}            from 'react-native';
import Index from './pages/Index';

export default function App() {
  return (
    <View style={styles.container}>
        <Index />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
