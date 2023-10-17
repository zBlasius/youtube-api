import React, { useState, useContext, useEffect } from 'react';
import C_Input from '../../Components/Input';
import { Grid, GridItem } from '@chakra-ui/react'
import C_Button from '../../Components/Button';
import CommentList from '../../Components/CommentList';
import { Context } from '../../store/Context';
import axios from 'axios';


export default function MainScreen() {
    const context = useContext(Context);
    const { state, setState } = context;
    const [keyWord, setKeyWord] = useState("");
    const [videoId, setVideoId] = useState(state.videoId);
    const [apiKey, setApiKey] = useState(localStorage.getItem('api_key') || '')

    function getListCommentsAtYoutubeApi(videoId: string) {
        axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`)
            .then(ret => {
                let newState: { author: string, comment: string, id: string }[] = [];
                let list = ret.data.items;

                list.forEach((item: any) => {
                    newState.push({
                        author: item.snippet.topLevelComment.snippet.authorDisplayName,
                        comment: item.snippet.topLevelComment.snippet.textOriginal,
                        id: item.id
                    })
                });

                setState({
                    ...state,
                    videoId, listComments: newState
                })
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    function searchCommentByWord(word: string) {
        const listComments = state.listComments;

        listComments.forEach(item => {

            const lenStr1 = word.length;
            const lenStr2 = item.comment.length;
            let str1 = word;
            let str2 = item.comment;

            const tab = new Array(lenStr1 + 1);
            for (let i = 0; i <= lenStr1; i++) {
                tab[i] = new Array(lenStr2 + 1);
            }

            for (let X = 0; X <= lenStr1; X++) {
                tab[X][0] = X;
            }

            for (let Y = 0; Y <= lenStr2; Y++) {
                tab[0][Y] = Y;
            }

            for (let X = 1; X <= lenStr1; X++) {
                for (let Y = 1; Y <= lenStr2; Y++) {
                    let cost = (str1[X - 1] === str2[Y - 1]) ? 0 : 1;

                    tab[X][Y] = Math.min(
                        tab[X - 1][Y] + 1,     // Deletar
                        tab[X][Y - 1] + 1,     // Inserir
                        tab[X - 1][Y - 1] + cost   // Substituir
                    );
                }
            }

            return tab[lenStr1][lenStr2];
        })
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
                <GridItem w="100%" pl='2' bg='orange.400' area={'header'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '50%', gap: 20 }}>

                        <C_Input placeholder="api_key" value={apiKey} onChange={(event) => {
                            setApiKey(event.target.value);
                            localStorage.setItem('api_key', event.target.value);
                        }} style={{ margin: '2px' }} />
                        <C_Input placeholder="videoId" value={videoId} onChange={(event) => setVideoId(event.target.value)} style={{ margin: '2px' }} />
                        <C_Button onClick={() => getListCommentsAtYoutubeApi(videoId)} />
                    </div>
                </GridItem>

                <GridItem w="100%" pl='2' bg='green.300' area={'main'}>
                    <C_Input placeholder="key-word" value={keyWord} onChange={(event) => {
                        setKeyWord(event.target.value)
                        searchCommentByWord(event.target.value);
                    }} style={{ maring: '2px' }} />
                    <CommentList />
                </GridItem>

            </Grid>
        </div>
    )
}