import { CozeAPI,ChatEventType, ChatStatus, COZE_COM_BASE_URL, RoleType } from '@coze/api';

export default async (req, context) => {
  const bodyText = await req.text();

  const apiClient = new CozeAPI({
    token: process.env.TOKEN,
    baseURL: 'https://api.coze.cn',
    allowPersonalAccessTokenInBrowser: true
  });
  const res = await apiClient.chat.stream({
    bot_id: '7515356748002263091',
    user_id: 'user5312814987',
    additional_messages: [
    {
        "role": "user",
        "type": "question",
        "content_type": "object_string",
        "content": JSON.stringify([{type:"image",bodyText}])
    }]
  });
  let gx=[];
  for await (const part of res) {
    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
        gx.push(part.data.content); // Real-time response
    }
  }
  return new Response(gx.join(""));
};
