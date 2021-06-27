import { useHistory } from 'react-router-dom'
import { Button } from '../../components/Button';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { database } from '../../services/firebase'

import illustrationSvg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleImg from '../../assets/images/google-icon.svg';

import styles from '../Home/style.module.scss';


export function Home() {

    const history = useHistory();
    const [keyRoom, setKeyRoom] = useState('');
    const { singInWithGoogle, user} = useContext(AuthContext);
    
    async function handleCreateRoom(){
        if(!user){
            await singInWithGoogle();
        }

        history.push('/rooms/new');
            
    }
    
    async function handleEntreRoom(e:FormEvent) {
        e.preventDefault();
        
        if(keyRoom.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`/rooms/${keyRoom}`).get();

        
        if(!roomRef.exists()){
            alert('Rooms not exist')
            return;
        }

        if(roomRef.val().endAt){
            alert('Room already closed')
            return;
        }
        console.log(roomRef)
        history.push(`/rooms/${keyRoom}`);

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

                    <button onClick={handleCreateRoom} className={styles.createRoom}>
                        <img src={googleImg} alt="logo google" />
                        Crie sua sala com o google
                    </button>

                    <div className={styles.separator}>
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleEntreRoom}>
                        <input
                            type="text"
                            placeholder="digite o código da sala"
                            onChange={(e)=>{setKeyRoom(e.target.value)}}
                            value={keyRoom}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>

                    </form>
                </div>
            </main>

        </div>

    )
}