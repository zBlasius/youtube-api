import React, {useContext} from 'react'
import { Context } from '../../store/Context';

export default function CommentList(){
    const context = useContext(Context);
    const {state} = context;
    
    return (
        <div>
            {state.listComments.map((item, index)=>(
                <p key={index}> {item.comment} </p>
            ))}
        </div>
    )
}