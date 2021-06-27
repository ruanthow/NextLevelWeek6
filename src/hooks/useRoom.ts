import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { database } from "../services/firebase";

interface QuestionsType{
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswhered: boolean;
    isHighlighted: boolean;
    likeCount:number;
    likeId:string | undefined;

}

type FireBaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswhered: boolean;
    isHighlighted: boolean;
    likes: Record<string,{
        authorId: string;
    }>
    
}>



export function useRoom(roomsId:string){
    const {user} = useContext(AuthContext);
    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState()

    
    useEffect(() => {

        const roomRef = database.ref(`/rooms/${roomsId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const fireBaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
            const parseQuestions = Object.entries(fireBaseQuestions).map(([key, value]) => {
                
                
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswhered: value.isAnswhered,
                    likeCount:Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],             
                }
               
            }) 
            setTitle(databaseRoom.title);
            setQuestions(parseQuestions)
            console.log(parseQuestions);
            
        })
       
        return () =>{
            roomRef.off('value');
        }

    }, [roomsId, user?.id]);

    return{questions, title}
}