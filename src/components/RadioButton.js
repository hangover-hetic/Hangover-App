import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { React, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';


export default function RadioButton({ data, onSelect, bindSelected }) {
    const [userOption, setUserOption] = useState(onSelect ? data[onSelect-1].value : 'Tous');

  return (
    <ScrollView style={styles.view}
    contentContainerStyle={{flexDirection:'row'}}
    horizontal={true}
    showsHorizontalScrollIndicator={false} >
        <Pressable
            style={styles.radioButton}
            onPress={() => {bindSelected('Tous'), setUserOption('Tous')}}
            >
            {/* add style here */}
            
            <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={'Tous' === userOption ? ['#feac5e', '#c779d0', '#4bc0c8'] : ['#858585', '#858585'] }
                            style={{borderRadius: 25}}>
                <View style={styles.circleGradient}>
                <Text style={'Tous' === userOption ? styles.textSelected : styles.textUnselected}>Tous</Text>
                </View>
            </LinearGradient>
            </Pressable>
    {data.map((item,index) => {
        
        return (
          <Pressable
            style={styles.radioButton}
            key={'radio-'+index}
            onPress={() => {bindSelected(item.value), setUserOption(item.value)}}
            >
              <View style={styles.circleGradient}>
                <Text
                  style={item.value === userOption ? styles.textSelected : styles.textUnselected}
                >
                  {item.value}
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  circleGradient: {
    margin: 1,
    backgroundColor: '#202020',
    borderRadius: 25,
  },
  textSelected: {
    margin: 2,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  textUnselected: {
    margin: 2,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: '#858585',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  radioButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 4,
  },
});
