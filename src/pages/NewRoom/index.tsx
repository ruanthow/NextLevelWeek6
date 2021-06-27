import { Link, useHistory } from 'react-router-dom';
import {FormEvent, useState} from 'react'
import illustrationSvg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import styles from '../NewRoom/styles.module.scss';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

export function NewRoom() {

    const {user} = useContext(AuthContext);
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory()
    
  async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRooms = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRooms.key}`)
    }

    

    return (
        <div className={styles.pageAuth}>
            <aside>
                <img src={illustrationSvg} alt="Ilustração simbolizando perguntas e repostas" />
                <strong>Crie salas de Q&amp;A A ao-vivo</strong>
                <p>tire as duvidas da sua adiência em tempo real</p>
            </aside>
            <main >
                <div className={styles.mainContent}>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova Sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da Sala"
                            onChange={(e)=> setNewRoom(e.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>

                    </form>
                    <p>Quer em uma sala existente ? <Link to="/">clique aqui</Link> </p>
                </div>
            </main>

        </div>

    )
}