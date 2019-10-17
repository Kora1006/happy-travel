export const state = ()=>{
    return{
        airDataList:[]
    }
}
export const mutations={
    setAirData(state,data){
        state.airDataList.push(data)
    }
}

export const actions = {

}

