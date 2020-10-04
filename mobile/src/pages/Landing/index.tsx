import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

const Landing = () => {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);
    useEffect(()=>{
        api.get('/connections').then(res=>{
            const { total } = res.data;
            setTotalConnections(total);
        });
    }, []);
  function handleNavigateToGiveClassesPage(){
    navigate('GiveClasses');
  }
  function handleNavigateToStudyPages(){
    navigate('Study');
  }
  return (
    <View style={styles.container}>
      <Image style={styles.banner} source= {landingImg}/>
      <Text style={styles.title}>
        Seja Bem-Vindo, {'\n'}
        <Text style={styles.titleBold}> O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContanier}>
        <RectButton 
          style={[styles.button, styles.buttonPrimay]}
          onPress={handleNavigateToStudyPages}  
        >
          <Image source={studyIcon}/>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={handleNavigateToGiveClassesPage}
        >
            <Image source={giveClassesIcon}/>
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon}/>
      </Text>
    </View>
  );
};

export default Landing;
