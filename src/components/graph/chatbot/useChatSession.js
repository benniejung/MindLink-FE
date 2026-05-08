import { useCallback, useEffect, useMemo, useState } from "react";
import useChatbotMutation from "./useChatbotMutation";

const createInitialMessages = () => [
  {
    id: "bot-greeting",
    from: "bot",
    text: "안녕하세요! 궁금한 게 있으신가요?",
    status: "done",
    retrievedTriples: [],
  },
];

const createMessageId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getStorageKey = (graphId) => `chatbot_graph_${graphId}`;

const sanitizeStoredMessages = (messages) =>
  messages
    .filter((message) => message.status !== "pending")
    .map((message) => ({
      ...message,
      status: message.status === "error" ? "error" : "done",
    }));

const readStoredSession = (graphId) => {
  const savedSession = sessionStorage.getItem(getStorageKey(graphId));

  if (!savedSession) {
    return {
      hasSentMessage: false,
      messages: createInitialMessages(),
    };
  }

  try {
    const parsedSession = JSON.parse(savedSession);
    const parsedMessages = Array.isArray(parsedSession?.messages)
      ? parsedSession.messages
      : createInitialMessages();

    return {
      hasSentMessage: Boolean(parsedSession?.hasSentMessage),
      messages:
        sanitizeStoredMessages(parsedMessages).length > 0
          ? sanitizeStoredMessages(parsedMessages)
          : createInitialMessages(),
    };
  } catch {
    return {
      hasSentMessage: false,
      messages: createInitialMessages(),
    };
  }
};

export default function useChatSession({ graphId, mode }) {
  const [messages, setMessages] = useState(() => readStoredSession(graphId).messages);
  const [hasSentMessage, setHasSentMessage] = useState(
    () => readStoredSession(graphId).hasSentMessage
  );
  const { mutateAsync, isPending } = useChatbotMutation({
    graphId,
    mode,
  });

  useEffect(() => {
    const storedSession = readStoredSession(graphId);
    setMessages(storedSession.messages);
    setHasSentMessage(storedSession.hasSentMessage);
  }, [graphId]);

  useEffect(() => {
    sessionStorage.setItem(
      getStorageKey(graphId),
      JSON.stringify({
        hasSentMessage,
        messages: sanitizeStoredMessages(messages),
      })
    );
  }, [graphId, hasSentMessage, messages]);

  const sendMessage = useCallback(
    async (userInput) => {
      const userMessage = {
        id: createMessageId("user"),
        from: "user",
        text: userInput,
        status: "done",
        retrievedTriples: [],
      };

      const botMessageId = createMessageId("bot");
      const pendingBotMessage = {
        id: botMessageId,
        from: "bot",
        text: "답변 생성 중이에요..",
        status: "pending",
        retrievedTriples: [],
      };

      setMessages((prev) => [...prev, userMessage, pendingBotMessage]);

      try {
        const result = await mutateAsync({
          chatContent: userInput,
          isNewChat: !hasSentMessage,
        });

        const payload = result?.data ?? result ?? {};
        const botMessage = {
          id: botMessageId,
          from: "bot",
          text: payload.chatContent || "응답 오류",
          status: "done",
          retrievedTriples: payload.retrievedTriples || [],
        };

        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMessageId ? botMessage : message
          )
        );
        setHasSentMessage(true);
      } catch {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMessageId
              ? {
                  ...message,
                  text: "에러 발생!",
                  status: "error",
                  retrievedTriples: [],
                }
              : message
          )
        );
      }
    },
    [hasSentMessage, mutateAsync]
  );

  return useMemo(
    () => ({
      messages,
      hasSentMessage,
      isPending,
      sendMessage,
    }),
    [hasSentMessage, isPending, messages, sendMessage]
  );
}
