import { CozeAPI, ChatEventType, ChatStatus, COZE_COM_BASE_URL, RoleType } from '@coze/api';

export default async(req, context) => {
    const bodyText = await req.text();
    const apiClient = new CozeAPI({
        token: "pat_lxlFBra1XGfDvbGLbELzhbE9C1OcSyBZolRQL7Yn4DpXTuZQKwF4tAapB7RoR7h3",
        baseURL: 'https://api.coze.cn',
        allowPersonalAccessTokenInBrowser: true
    });
    const res = await apiClient.chat.stream({
        bot_id: '7519873953356120075',
        user_id: 'user5312814987',
        additional_messages: [{
            "role": "user",
            "type": "question",
            "content_type": "text",
            "content": bodyText
        }]
    });
    let gx = [];
    for await (const part of res) {
        if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
            gx.push(part.data.content); // Real-time response
        }
    }
    var hds = new Headers();
    hds.append('Access-Control-Allow-Origin', '*'); // 允许所有域名（生产环境建议替换为具体域名）
    hds.append('Access-Control-Allow-Headers', '*'); // 允许的请求头
    hds.append('Access-Control-Allow-Methods', 'GET, POST'); // 允许的 HTTP 方法)
    return new Response(gx.join(""), {
        headers: hds
    });
};