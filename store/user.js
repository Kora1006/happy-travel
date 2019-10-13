export const state = () => {
    return {
        userInfo: {},
        current: 0
    }
}

// 同步修改state
export const mutations = {
    // 将用户信息写入
    setUserInfo(state, data) {
        state.userInfo = data
    },
    setCurrent(state, num) {
        state.current = num
    },
    // 将用户信息删除
    clearUserInfo(state) {
        state.userInfo = {}
    }

}


// 异步修改state
export const actions = {

}