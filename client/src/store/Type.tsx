
type listCommentsObj = {author: string, comment: string, id:string};
type objMatchedComment = {id:string, indexWord: Array<number>};
type AppContextState = {
    videoId: string, 
    listComments: Array<listCommentsObj>, 
    listMatchedComment: Array<objMatchedComment>,
};

const appCtxDefaultValue = {
    state: {
        videoId:'123', 
        listComments:[{author: '', comment:'', id:''}], 
        listMatchedComment:[{id:'', indexWord:[0]}]
    },
    setState: (state: AppContextState) => {}
}

export default appCtxDefaultValue;