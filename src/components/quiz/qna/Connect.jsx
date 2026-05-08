import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Q from "../../../styles/quiz/quiz.jsx";
import AnswerOptionList from "./AnswerOptionList.jsx";
import Modal from "../modal/modal.jsx";
import usePost from "../../../hooks/usePost.jsx";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  MarkerType,
  getStraightPath,
} from "reactflow";
import "reactflow/dist/style.css";
import { useMemo } from "react";
import {
  levelStyles,
  groupStyles,
} from "../../../mocks/quiz/connectGraphData.js";
import Loading from "./Loading.jsx";
import colors from "../../../styles/common/colors";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  forceCollide,
} from "d3-force";
import GraphNode from "../../graph/graphNode";

const nodeTypes = {
  custom: GraphNode,
};

export default function Connect() {
  const navigate = useNavigate();
  // 모달 상태 및 퀴즈 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [correctNum, setCorrectNum] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  // 현재 문제 번호 및 정답 수 관리
  const [currentQuizNum, setCurrentQuizNum] = useState(1);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const { id: graphId, mode: modeName } = useParams(); // 그래프 id값 가져오기
  const { post, loading, error } = usePost(`/quiz/${graphId}?mode=${modeName}`); // 퀴즈 api 불러오기
  const [data, setData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const graphRef = useRef(null); // 그래프 참조

  // const { setViewport } = useReactFlow();

  useEffect(() => {
    // graphId, modeName이 있을 때만 요청
    if (graphId && modeName) {
      post().then(setData).catch(console.error);
    }
  }, [graphId, modeName]);

  const quizList = data?.data?.quizzes?.quizList || [];
  const knowledgeGraph = data?.data?.quizzes?.knowledgeGraph;

  // 노드 처리
  const processedNodes = useMemo(() => {
    if (!knowledgeGraph) return [];
    const questionTargetId = quizList[currentQuizNum - 1]?.questionTargetId; // ? 노드 아이디
    return knowledgeGraph.nodes.map((node) => ({
      ...node,
      label: node.id === questionTargetId ? "?" : node.label, // 문제 노드 아이디와 일치하면 ? 표시
    }));
  }, [knowledgeGraph, quizList, currentQuizNum]);

  // 통신 연결 시 주석 해제
  useEffect(() => {
    if (quizList.length > 0) {
      const currentQuestion = quizList[currentQuizNum - 1];
      setAnswerOptions(currentQuestion.shuffledOptions);
      setSelectedIdx(null); // 문제가 바뀔 때마다 선택 초기화
    }
  }, [data, currentQuizNum]);

  // 정답확인버튼을 눌렀을 때
  const handleCheckAnswer = () => {
    const currentQuestion = quizList[currentQuizNum - 1];
    const selectedAnswer = answerOptions[selectedIdx];
    const result = selectedAnswer === currentQuestion.answer;
    setIsCorrect(result);
    setCorrectAnswer(currentQuestion.answer);
    if (result) setCorrectNum((prev) => prev + 1);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedIdx(null);
    const isLast = currentQuizNum >= quizList.length;
    if (isLast) {
      navigate(`/quiz/${graphId}/result`, {
        state: {
          total: quizList.length,
          correct: correctNum,
          mode: modeName,
        },
      });
    } else {
      setCurrentQuizNum((prev) => prev + 1);
    }
  };

  const handleOptionClick = (idx) => {
    setSelectedIdx(idx);
  };

  useEffect(() => {
    if (!knowledgeGraph) return;

    const questionTargetId = quizList[currentQuizNum - 1]?.questionTargetId;

    // 그래프 영역 크기 계산
    const rect = graphRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // 시뮬레이션용 노드/링크 구성
    const simNodes = knowledgeGraph.nodes.map((node) => ({
      ...node,
      label: node.id === questionTargetId ? "?" : node.label,
    }));

    // 링크 목록 생성
    const simLinks = knowledgeGraph.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const simulation = forceSimulation(simNodes)
      .force("charge", forceManyBody().strength(-800)) // 서로 밀어냄
      .force("center", forceCenter(centerX, centerY)) // 중앙 기준
      .force(
        "link",
        forceLink(simLinks)
          .id((d) => d.id)
          .distance((link) => {
            const source = simNodes.find((n) => n.id === link.source);
            const target = simNodes.find((n) => n.id === link.target);
            const levelGap = Math.abs(
              (source?.level ?? 1) - (target?.level ?? 1)
            );
            return 500 + levelGap * 250;
          })
      )
      .force(
        "collide", // 노드 충돌 방지
        forceCollide().radius((d) => {
          const style = levelStyles[d.level] || levelStyles[1];
          const nodeSize = parseFloat(style.size) || 50;
          return nodeSize / 2 + 100;
        })
      )
      .stop();

    const root = simNodes.find((n) => n.level === 0 && n.label !== "?");
    if (root) {
      root.fx = centerX;
      root.fy = centerY;
    }
    for (let i = 0; i < 300; ++i) simulation.tick(); // 시뮬레이션 횟수 증가

    // 노드 스타일링
    const styledNodes = simNodes.map((node) => {
      const levelStyle = levelStyles[node.level] || levelStyles[1];
      const groupStyle = groupStyles[node.group] || {};
      const backgroundColor = colors[groupStyle.background] || levelStyle.color;

      const isQuestionNode = node.label === "?"; // 문제 노드 아이디와 일치하는 '?' 노드를 확인한다
      const fontSize = isQuestionNode ? 50 : node.level === 0 ? 35 : 25;

      return {
        id: node.id,
        type: "custom",
        data: {
          label: node.label,
          level: node.level,
          group: node.group,
        },
        position: { x: node.x, y: node.y },

        style: {
          width: levelStyle.size,
          height: levelStyle.size,
          background: backgroundColor,
          color: isQuestionNode ? "#ff0000" : groupStyle.color || "#333", // ? 노드는 빨간색
          borderRadius: "50%",
          border: isQuestionNode ? "4px dashed #ff0000" : "2px solid #f89d36",
          fontWeight: isQuestionNode ? 900 : "bold", // ? 노드는 ultra-bold
          fontSize: fontSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Ownglyph_meetme-Rg",
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#f89d36",
        },
      };
    });

    // 엣지 스타일링
    const styledEdges = knowledgeGraph.edges.map((edge) => ({
      id: `e${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: "straight",
      style: {
        stroke: "#f89d36",
        strokeWidth: 2,
      },
      labelStyle: {
        fontWeight: 600,
        fontSize: 20,
        fill: "#333",
        padding: 10,
      },
      labelBgStyle: {
        fill: "#fff8d6",
        stroke: "#f89d36",
        strokeWidth: 0.5,
        rx: 10,
        ry: 10,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#f89d36",
      },
    }));

    setNodes(styledNodes);

    // fitView 호출하여 그래프를 처음에 맞게 보여주기
    const questionNode = styledNodes.find((node) => node.label === "?");
    if (questionNode) {
      setViewport({
        x: questionNode.x - 200,
        y: questionNode.y - 200,
        zoom: 2,
      });
    }
    const edgeColor = "#f89d36"; // 엣지 선 색상
    const labelColor = "#fff8d6"; // 엣지 라벨 배경색
    const strokeColor = "#f89d36"; // 엣지 라벨 테두리 색

    const edgeWithLabels = knowledgeGraph.edges.map((edge) => {
      const sourceNode = simNodes.find((n) => n.id === edge.source);
      const targetNode = simNodes.find((n) => n.id === edge.target);

      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const angle = Math.atan2(dy, dx);

      const sourceStyle = levelStyles[sourceNode.level] || levelStyles[1];
      const targetStyle = levelStyles[targetNode.level] || levelStyles[1];

      const sourceRadius = parseFloat(sourceStyle.size) / 2 || 40;
      const targetRadius = parseFloat(targetStyle.size) / 2 || 40;

      const adjustedSource = {
        x: sourceNode.x + sourceRadius * Math.cos(angle),
        y: sourceNode.y + sourceRadius * Math.sin(angle),
      };

      const adjustedTarget = {
        x: targetNode.x - targetRadius * Math.cos(angle),
        y: targetNode.y - targetRadius * Math.sin(angle),
      };

      const [path] = getStraightPath({
        sourceX: adjustedSource.x,
        sourceY: adjustedSource.y,
        targetX: adjustedTarget.x,
        targetY: adjustedTarget.y,
      });

      return {
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "straight",
        label: edge.label,
        data: { path },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColor,
        },
        style: {
          strokeWidth: 3,
          stroke: edgeColor,
          strokeDasharray: "0",
          opacity: 1,
        },
        labelBgStyle: {
          fill: labelColor,
          fillOpacity: 1,
          stroke: strokeColor,
          strokeWidth: 0.5,
          rx: 4,
          ry: 4,
        },
        labelStyle: {
          fontWeight: 600,
          fontSize: 20,
          fill: colors.black,
          fontFamily: "Ownglyph_meetme-Rg",
          textAlign: "center",
        },
      };
    });
    setEdges(edgeWithLabels);
  }, [knowledgeGraph, currentQuizNum]);

  return (
    <ReactFlowProvider>
      {/* 나머지 컴포넌트 */}
      <Q.QnaModeLayout>
        {loading ? (
          <Q.LoadingContainer>
            <Loading />
          </Q.LoadingContainer>
        ) : (
          <>
            <Q.QnaQuestionContainer $height="100%">
              <Q.QuestionText>
                다음 <span style={{ color: "#ff0000" }}>?</span> 과 가장 관련이
                있는 단어는?
              </Q.QuestionText>
              <Q.GraphContainer ref={graphRef}>
                <ReactFlow
                  key={currentQuizNum}
                  nodes={nodes || []}
                  edges={edges || []}
                  fitView
                  zoomOnScroll={false}
                  panOnScroll={false}
                  zoomOnDoubleClick={false}
                  panOnDrag
                  fitViewOptions={{ padding: 0.2 }}
                  proOptions={{
                    hideAttribution: true, // 라이브러리 워터마크 제거
                  }}
                >
                  <Background />
                </ReactFlow>
              </Q.GraphContainer>
              <Q.ConfirmButton onClick={handleCheckAnswer}>
                정답 확인
              </Q.ConfirmButton>
              <Q.QuizCount>
                {currentQuizNum} / {quizList.length}
              </Q.QuizCount>
            </Q.QnaQuestionContainer>
            <Q.QnaBottomContainer>
              <AnswerOptionList
                options={answerOptions}
                selectedIdx={selectedIdx}
                onClick={handleOptionClick}
              />
            </Q.QnaBottomContainer>
            {isOpen && (
              <Modal
                onClose={handleCloseModal}
                isCorrect={isCorrect}
                correctAnswer={correctAnswer}
              />
            )}
          </>
        )}
      </Q.QnaModeLayout>
    </ReactFlowProvider>
  );
}
