import React, { useState } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';
import api from '../../services/api';

export interface Teacher{
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface Props {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem:React.FC<Props> = ({teacher, favorited}) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  async function handlerToggleFavorite(){
    const favorite = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];
    if(favorite){
      favoritesArray = JSON.parse(favorite);
    }
    if(isFavorited){
      const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher) => {
        return teacherItem.id === teacher.id;
      });
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }
  function handlerLinkToWhatsapp(){
    api.post('connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{uri: teacher.avatar}}  
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handlerToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
            { isFavorited ? <Image source={unFavoriteIcon}/> : <Image
              source={heartOutlineIcon}
            />}
          </RectButton>
          <RectButton style={styles.contactButton} onPress={handlerLinkToWhatsapp}>
            <Image
              source={whatsappIcon}
            />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;