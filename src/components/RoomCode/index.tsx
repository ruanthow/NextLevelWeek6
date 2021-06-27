

import CopyImg from '../../assets/images/copy.svg';
import styles from '../RoomCode/styles.module.scss';


interface RoomCodeProps{
    code:string
}

export function RoomCode(props:RoomCodeProps){

function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
}

    return(
        <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={CopyImg} alt="Copy code" />
            </div>
            <span>Sala# {props.code}</span>
        </button>
    )
}