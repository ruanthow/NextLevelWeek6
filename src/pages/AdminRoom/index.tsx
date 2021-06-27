import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
import {Questions} from '../../components/Questions';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import styles from '../Room/styles.module.scss';
import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';



interface RoomParams {
    id: string;
}




export function AdminRoom() {

    const params = useParams<RoomParams>();
    const roomsId = params.id;
    const history = useHistory();
   // const { user } = useContext(AuthContext);
    const {questions, title} = useRoom(roomsId);

    async function handleDeleteQuestion(questionId:string) {
       if(window.confirm('Você tem certeza que deseja deletar essa pergunta?')){
            await database.ref(`/rooms/${roomsId}/questions/${questionId}`).remove()
       }
    }

    async function handleCheckQuestionAsAnswered(questionId:string){
        await database.ref(`/rooms/${roomsId}/questions/${questionId}`).update({
            isAnswhered:true
        })
    }

    async function handleCheckHighlightQuestions(questionId:string){
        await database.ref(`/rooms/${roomsId}/questions/${questionId}`).update({
            isHighlighted:true
        })
    }

    async function handleEndRoom(){
        database.ref(`/rooms/${roomsId}`).update({
            endAt: new Date(),
        })

        history.push('/')
    }

    return (
        <div className={styles.pageRoom}>
            <header>
                <div className={styles.content}>
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomsId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sessão</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className={styles.roomtitle}>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                {questions.length > 0 && questions.map((value)=>{
                    return(
                        <Questions 
                        key={value.id} 
                        content={value.content} 
                        author={value.author}
                        isAnswhered={value.isAnswhered}
                        isHighlighted={value.isHighlighted}
                        >
                            {!value.isAnswhered && (
                                <>
                                <button
                                onClick={()=> handleCheckQuestionAsAnswered(value.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>
                                <button
                                onClick={()=> handleCheckHighlightQuestions(value.id)}
                                >
                                    <img src={answerImg} alt="Marcar as perguntas em destaques" />
                                </button>
                                </>
                            )}
                            <button
                            onClick={()=> handleDeleteQuestion(value.id)}
                            >
                                <img src={deleteImg} alt="Deletar pergunta" />
                            </button>
                        </Questions>
                    )
                })}
            </main>
        </div>
    );
}