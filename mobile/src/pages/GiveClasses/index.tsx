import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';
import styles from './styles';

const GiveClasses = () => {
  const { goBack } = useNavigation();
  function handleNavigateBack(){
    goBack();
  }
  return (
      <View style={styles.container}>
        <ImageBackground 
          resizeMode = 'contain' 
          source={giveClassesBackgroundImage} 
          style={styles.content}
        >
          <Text style={styles.title}>Quer Ser um Proffy?</Text>
          <Text style={styles.description}>
            Para começar, você precisa se cadastrar como professor na nossa plataforma Web.
          </Text>
        </ImageBackground>
        <RectButton onPress={handleNavigateBack} style= {styles.okButton}>
          <Text style={styles.okButtonText}>
            Tudo Bem
          </Text>
        </RectButton>
      </View>
  );
};

export default GiveClasses;
