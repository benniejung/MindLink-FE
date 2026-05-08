import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import * as G from "../../../styles/graph/graph";
import CHATBOT from "../../../assets/images/graph/chatbot.png";
import CLOSE from "../../../assets/images/header/close.png";
import useChatSession from "./useChatSession";

const renderMessageBody = (message) => {
  if (message.from === "bot" && message.status === "pending") {
    const loadingText = message.text || "답변 생성 중이에요..";

    return (
      <G.ChatLoadingP>
        {loadingText.split("").map((char, index) => (
          <span key={`${message.id}-${index}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </G.ChatLoadingP>
    );
  }

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        p: (props) => <G.MarkdownP {...props} />,
        ul: (props) => <G.MarkdownUL {...props} />,
        li: (props) => <G.MarkdownLI {...props} />,
        h1: (props) => <G.MarkdownH1 {...props} />,
        h2: (props) => <G.MarkdownH2 {...props} />,
        h3: (props) => <G.MarkdownH3 {...props} />,
        details: (props) => <G.MarkdownDetails {...props} />,
        summary: (props) => <G.MarkdownSummary {...props} />,
      }}
    >
      {message.text}
    </ReactMarkdown>
  );
};

export default function Chatbot({ setIsClickChatbotBtn, isVisible }) {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("rag");
  const [isComposing, setIsComposing] = useState(false);
  const bottomRef = useRef(null);
  const { messages, isPending, sendMessage } = useChatSession({
    graphId: id,
    mode,
  });

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleCloseClick = () => {
    setIsClickChatbotBtn(false);
  };

  const handleSubmit = async () => {
    const userInput = input.trim();

    if (!userInput || isPending) {
      return;
    }

    setInput("");
    await sendMessage(userInput);
  };

  return (
    <G.ChatbotLayout isVisible={isVisible}>
      <G.ChatbotContainer>
        <G.ChatbotHeader>
          <G.CommonButtonImg
            style={{ width: "2vw", height: "2vw" }}
            src={CHATBOT}
            alt="chatBot"
          />

          <G.ChatControlItem>
            <G.GraphRAGTitle>GraphRAG</G.GraphRAGTitle>
            <G.ChatModeButton
              onClick={() => setMode("rag")}
              selected={mode === "rag"}
            >
              ON
            </G.ChatModeButton>
            <G.ChatModeButton
              onClick={() => setMode("default")}
              selected={mode === "default"}
            >
              OFF
            </G.ChatModeButton>
          </G.ChatControlItem>

          <G.CommonButtonImg
            style={{ width: "2vw", height: "2vw", cursor: "pointer" }}
            src={CLOSE}
            alt="close"
            onClick={handleCloseClick}
          />
        </G.ChatbotHeader>

        <G.ChatContent>
          {messages.map((message) => (
            <G.ChatBox key={message.id} from={message.from}>
              {renderMessageBody(message)}
              {message.retrievedTriples?.length > 0 && (
                <details>
                  <G.ToggleButton>사용된 데이터 보기</G.ToggleButton>
                  <G.ChunkBox>
                    {message.retrievedTriples.map((chunk, index) => (
                      <G.ChunkP key={`${message.id}-triple-${index}`}>
                        {typeof chunk === "object"
                          ? JSON.stringify(chunk)
                          : chunk}
                      </G.ChunkP>
                    ))}
                  </G.ChunkBox>
                </details>
              )}
            </G.ChatBox>
          ))}
          <div ref={bottomRef} />
        </G.ChatContent>

        <G.ChatInputContainer>
          <G.ChatInput
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isComposing && !isPending) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          <G.ChatSubmitButton onClick={handleSubmit} disabled={isPending}>
            전송
          </G.ChatSubmitButton>
        </G.ChatInputContainer>
      </G.ChatbotContainer>
    </G.ChatbotLayout>
  );
}
