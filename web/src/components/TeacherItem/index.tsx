import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

export interface Teacher{
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface Props{
    teacher: Teacher;
}

const TeacherItem: React.FC<Props> = ({teacher}) => {
    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id
        });
    }
  return (
    <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
            <p>Preço/hora: <strong>{teacher.cost}</strong></p>
            <a onClick={createNewConnection} target="blank" href={`https://wa.me/${teacher.whatsapp}/`}>
                <img src={whatsappIcon} alt="Contanto Whatsapp"/>
                Entrar em contanto
            </a>
        </footer>
    </article>
  );
}

export default TeacherItem;