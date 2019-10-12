export const state = {
    userInfo: {}
}

// 同步修改state
export const mutations = {
    // 将用户信息写入
    setUserInfo(state, data) {
        state.userInfo = data
    },
    // 将用户信息删除
    clearUserInfo(state) {
        state.userInfo = {}
    }

}


// 异步修改state
export const actions = {

}