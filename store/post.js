export const state = () => {
    return {
        postDraftList:[]
        
    }
}
export const mutations = {
    setPostData(state, data) {
        state.postDraftList.push(data)
    },
    removePostData(state, index) {
        state.postDraftList.splice(index,1)
    }

}

export const actions = {
    
}