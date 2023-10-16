import React, { useState, useContext } from 'react';
import C_Input from '../../Components/Input';
import { Grid, GridItem } from '@chakra-ui/react'
import C_Button from '../../Components/Button';
import CommentList from '../../Components/CommentList';
import { Context } from '../../store/Context';

export default function MainScreen() {
    const context = useContext(Context);
    const {state, setState} = context;
    const [keyWord, setKeyWord] = useState("");
    const [videoId, serVideoId] = useState(state.videoId);

    function getListCommentsAtYoutubeApi(videoId:string){
        //setState({videoId, listComments:[{author: 'Sofia Coelho', comment:'Oloco meu'}]})
    }

    return (
        <div>
            <Grid
                templateAreas={`
                  "header header"
                  "main main"
                  "main main"
                  "main main"
                  "main main"`}
                h="100vh"
                color='blackAlpha.700'
                fontWeight='bold'
            >
                <GridItem w="100%" pl='2' bg='orange.400' area={'header'} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div style={{width:'50%', gap:20}}>
                        <C_Input placeholder="videoId" value={videoId} onChange={(event) => serVideoId(event.target.value)} style={{margin:'2px'}} />
                        <C_Input placeholder="key-word" value={keyWord} onChange={(event) => setKeyWord(event.target.value)} style={{maring:'2px'}} />
                        <C_Button onClick={()=> getListCommentsAtYoutubeApi(videoId)}/>
                    </div>
                </GridItem>

                <GridItem w="100%" pl='2' bg='green.300' area={'main'}>
                    <CommentList/>
                </GridItem>

            </Grid>
        </div>
    )
}