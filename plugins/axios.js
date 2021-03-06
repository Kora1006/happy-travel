// 调用消息提醒
import { Message } from "element-ui";

// context包含nuxt的所有方法，固定有参数
export default (context) => {
    context.$axios.onError(res => {
        const { message, statusCode } = res.response.data
        console.log(res.response)
        if (statusCode === 400) {
            Message.error({ message })
        }
        if ([401, 403].indexOf(statusCode) > -1) {
            // 路由重定向的方法
            context.redirect("/user/login");
        }
    })
} 