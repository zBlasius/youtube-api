
type listCommentsObj = {author: string, comment: string};
type AppContextState = {videoId: string, listComments: Array<listCommentsObj>};

const appCtxDefaultValue = {
    state: {videoId:'', listComments:[{author: 'Gustavo Blasius', comment:'Olha o comentário ai campeão'}]},
    setState: (state: AppContextState) => {}
}

export default appCtxDefaultValue;