import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { BorderlessButton, RectButton, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [ favorites, setFavorites ] = useState<number[]>([]);
  const [ isFiltersVisible, setIsFilterVisible ] = useState(false);
  const [ subject, setSubject ] = useState('');
  const [ week_day, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');
  function loadFavorites(){
    AsyncStorage.getItem('favorite').then(response =>{
      if(response){
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  }
  function handlerToggleFiltersVisible(){
    setIsFilterVisible(!isFiltersVisible);
  }
  async function handlerFiltersSubmit(){
    loadFavorites()
    const response = await api.get('/classes', {
      params:{
        subject,
        week_day,
        time,
      }
    });
    setIsFilterVisible(false);
    setTeachers(response.data);
  }
  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={
          <BorderlessButton>
            <Feather name= "filter" size={20} color="#FFF" onPress={handlerToggleFiltersVisible}/>
          </BorderlessButton>
        }>
        { isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>fas</Text>
              <TextInput 
                style={styles.input}
                placeholder= "Qual a matéria?"
                placeholderTextColor="#C1BCCC"
                value={subject}
                onChangeText={text => setSubject(text)}
              />
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da Semana</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder= "Qual o dia?"
                    placeholderTextColor="#C1BCCC"
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder= "Qual horário?"
                    placeholderTextColor="#C1BCCC"
                    value={time}
                    onChangeText={text => setTime(text)}
                  />
                </View>
              </View>
              <RectButton onPress={handlerFiltersSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
        )} 
      </PageHeader>
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 10,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
          ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
