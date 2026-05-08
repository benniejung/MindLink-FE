import { useMutation } from "@tanstack/react-query";
import { API } from "../../../apis/axios";

const getChatbotUrl = (graphId, mode) =>
  mode === "default" ? `/chatbot/${graphId}` : `/chatbot/${graphId}?mode=${mode}`;

const postChatbotMessage = async ({ graphId, mode, chatContent, isNewChat }) => {
  const response = await API.post(getChatbotUrl(graphId, mode), {
    chatContent,
    isNewChat,
  });

  return response.data;
};

export default function useChatbotMutation({ graphId, mode }) {
  return useMutation({
    mutationKey: ["chatbot", graphId, mode],
    mutationFn: ({ chatContent, isNewChat }) =>
      postChatbotMessage({
        graphId,
        mode,
        chatContent,
        isNewChat,
      }),
  });
}
