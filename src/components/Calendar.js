import { StyleSheet } from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import { AntDesign   } from '@expo/vector-icons';
import dayjs from '../services/dayjs';

export default function CalendarInscription({data}) {

    LocaleConfig.locales['fr'] = {
        monthNames: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
      };
    LocaleConfig.defaultLocale = 'fr';
    const colors = ['#feac5e', '#c779d0', '#4bc0c8']
    
    var dateInscription = {}
    dateInscription[dayjs().format("YYYY-MM-DD")] =  {
        startingDay: true,
        endingDay: true,
        color: '#ff9531'
    };
    data.map((item) => {
        var color = colors[Math.floor(Math.random() * colors.length)]
        dateInscription[dayjs(item.startDate).format("YYYY-MM-DD")] = {
            startingDay: true,
            color: color
        };
        dateInscription[dayjs(item.endDate).format("YYYY-MM-DD")] = {
            endingDay: true,
            color: color
        };
        if (item.startDate && item.endDate) {
            let start = dayjs(item.startDate).startOf('day').add(1, 'day');
            const end = dayjs(item.endDate).startOf('day');
            while (end.isAfter(start)) {
              Object.assign(dateInscription, { [start.format('YYYY-MM-DD')]: { selected: true, color: color } });
              start = start.add(1, 'days');
            }
          }
        
        /* dateInscription[`${dayjs(item.startDate).format("YYYY-MM-DD")}`] = {
            startingDay: true,
            color:'green'
        }
        dateInscription.dayjs(item.endDate).format("YYYY-MM-DD") = {
            endingDay: true,
            color:'green'
        } */
    })
    console.log(dateInscription);
  return (
    <Calendar
        style={{
            backgroundColor:'#202020'
        }}
        theme={{
            backgroundColor: '#202020',
            calendarBackground: '#202020',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: '#feac5e',
            selectedDayTextColor: 'white',
            todayTextColor: 'white',
            dayTextColor: 'white',
            monthTextColor: 'white',
            indicatorColor: '#4bc0c8',
            textDayFontFamily: 'Poppins',
            textMonthFontFamily: 'Poppins',
            textDayHeaderFontFamily: 'Poppins',
        }}
        markingType={'period'}
        markedDates={dateInscription}
        onDayPress={day => {
            day.selected =  true
        }}
        onDayLongPress={day => {
            console.log('selected day', day);
        }}
        monthFormat={'MMMM yyyy'}
        onMonthChange={month => {
            console.log('month changed', month);
        }}
        renderArrow={direction => <AntDesign name={`arrow${direction}`} size={24} color="white" />}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        // Replace default month and year title with custom one. the function receive a date as parameter
        
        enableSwipeMonths={true}
    />
  )
}

const styles = StyleSheet.create({
    
  });