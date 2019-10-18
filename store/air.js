export const state = () => {
    return {
        airDataList: [],
        totalPrice:0
        
    }
}
export const mutations = {
    setAirData(state, data) {
        state.airDataList.push(data)
    },
    setTotalPrice(state,price){
        state.totalPrice = price
    },
    deletAirData(state,index){
        state.airDataList.splice(index,1)
    }

}

export const actions = {
    
}

