export const state = () => {
    return {
        userInfo: {},
        current: 0
    }
}

// 同步修改state
export const mutations = {
    setUserInfo(state,data){
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
    // 发送登录请求获取登录信息
   async login(state, data) {
       let res = await this.$axios({
           url:'/accounts/login',
           method:'POST',
           data:data
       })
       if (res.status===200){
           const data = res.data
           state.commit('setUserInfo',data)
       }
    //    将获取结果返回
    return res
    }
}