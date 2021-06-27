import '../Questions/styles.scss';
import { ReactNode } from 'react';

type QuestionsProps = {
    content: string;
    author: {
        avatar: string;
        name: string;
    }
    children?: ReactNode;
    isAnswhered?:boolean;
    isHighlighted?: boolean;
}

export function Questions({ content, author, children, isAnswhered, isHighlighted}: QuestionsProps) {

    return (
        <div className={`question ${isAnswhered ? 'answered' : ''} ${isHighlighted && !isAnswhered ? 'highlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className={"userInfo"}>
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>

    )
}