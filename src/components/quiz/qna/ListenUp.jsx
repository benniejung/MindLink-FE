import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Q from "../../../styles/quiz/quiz.jsx";
import Modal from "../modal/modal.jsx";
import LISTENUP from "../../../assets/images/quiz/listenup.webp";
import AnswerOptionList from "./AnswerOptionList.jsx";
import { speak, stop } from "../../../utils/tts.jsx";
import usePost from "../../../hooks/usePost.jsx";
import usePatch from "../../../hooks/usePatch.jsx";
import Loading from "./Loading.jsx";
import { useTTS } from "../../../contexts/TTSContext.jsx";
import { listenUpMockData } from "../../../mocks/quiz/listenUpMockData.js";

export default function ListenUp() {
  console.log("ListenUp Rendered");
  const USE_MOCK = true; // 목데이터 사용 여부 플래그 (실 서버 연동 시 false로 변경)
  const navigate = useNavigate();
  const { id: graphId, mode: modeName } = useParams(); // 그래프 id값 가져오기
  const { post, loading, error } = usePost(`/quiz/${graphId}?mode=${modeName}`); // 퀴즈 api 불러오기
  const { patch } = usePatch();
  const [data, setData] = useState(USE_MOCK ? listenUpMockData : null);
  const quizList = data?.data?.quizzes?.quizzes || [];

  
/*   useEffect(() => {
    // 문제번호가 바뀔때마다 재렌더링
    if (quizList.length > 0) {
      // 문제 받아오면 초기화
      const currentQuestion = quizList[currentQuizNum - 1];
      setDragList(currentQuestion.shuffled);
      setDroppedList(Array(currentQuestion.answer.length).fill("")); // 빈칸 초기화
    }
  }, [data, currentQuizNum]);
 */
useEffect(() => {
  if (graphId && modeName) {
        // 여기서 바로 첫 문제 세팅해버리기!
        const firstQuiz = quizList[0];
        setDragList(firstQuiz.shuffled);
        setDroppedList(Array(firstQuiz.answer.length).fill(""));
  }
}, [graphId, modeName]);


  const [isOpen, setIsOpen] = useState(false); // 정답 모달 상태
  const [isCorrect, setIsCorrect] = useState(false); // 정답 여부
  const [correctAnswer, setCorrectAnswer] = useState(""); // 정답

  const [currentQuizNum, setCurrentQuizNum] = useState(1); // 현재 문제 번호
  const [correctNum, setCorrectNum] = useState(0); // 정답 개수

  // 드래그앤드롭 상태변수들
  const dragItemRef = useRef(null); // 현재 드래그 중인 단어 인덱스
  const [dragList, setDragList] = useState([]); // 드래그 가능한 단어들
  const [droppedList, setDroppedList] = useState([]); // 드롭된 정답 슬롯


/*   useEffect(() => {
    if (USE_MOCK) return;
    if (graphId && modeName) {
      post().then(setData).catch(console.error);
    }
  }, [graphId, modeName]);
 */



  const handleDragStart = (index) => {
    dragItemRef.current = index;
    console.log(dragItemRef.current);
  };

  const handleDrop = (dropIndex) => {
    //const draggedIndex = dragItemRef.current;

    const dragged = dragList[dragItemRef.current];
    if (!dragged) return;

    setDroppedList((prev) => {
      const newList = [...prev];
      if (newList[dropIndex] === "") {
        newList[dropIndex] = dragged;
        setDragList((prevList) => prevList.filter((word) => word !== dragged));
      }
      return newList;
    });

    // 드래그 참조값 초기화
    dragItemRef.current = null;
  };

  const handleSlotClick = (index) => {
    const removed = droppedList[index]; // 클릭한 단어 저장
    if (removed === "") return; // 빈칸 클릭 방지

    setDroppedList((prev) => {
      const newList = [...prev];
      newList[index] = ""; // 빈 문자열로 변경
      return newList;
    });

    setDragList((prev) => [...prev, removed]);
  };

  // 정답확인버튼을 눌렀을 때
  const handleCheckAnswer = () => {
    const currentAnswer = quizList[currentQuizNum - 1].answer.join("");
    const userAnswer = droppedList.join("");
    const result = currentAnswer === userAnswer;
    setIsCorrect(result);
    if (result) {
      setCorrectNum((prev) => prev + 1);
    } else {
      setCorrectAnswer(quizList[currentQuizNum - 1].description);
    }
    setIsOpen(true);
  };

  const handleCloseModal = async () => {
    setIsOpen(false);
    const total = data.data.quizzes.quizzes.length;
    const isLast = currentQuizNum >= total;
    const isPerfect = correctNum === total;

    if (isLast) {
      if (isPerfect) {
        try {
          const result = await patch(
            `/quiz/perfect-score/${graphId}?mode=${modeName}`
          );
          console.log("Perfect score patch success" + result);
        } catch (e) {
          console.error("Perfect score patch error:", e);
        }
      }
      navigate(`/quiz/${graphId}/result`, {
        state: {
          total,
          correct: correctNum,
          mode: modeName,
        },
      });
    } else {
      setCurrentQuizNum((prev) => prev + 1);
    }
  };

  // tts
  const handleSound = useCallback(() => {
    stop(); // 기존 음성 중지
    const currentAnswerArray = quizList[currentQuizNum - 1]?.answer;
    if (!currentAnswerArray) return;
    const sentence = currentAnswerArray.join(" ");
    speak(sentence);
  }, [quizList, currentQuizNum]);

  // 처음 렌더링(문제 데이터가 준비된 직후)에도 자동 실행
  useEffect(() => {
    // const shouldSpeak = localStorage.getItem("shouldSpeak") === "true";
    if (
      // shouldSpeak &&
      quizList.length > 0 &&
      quizList[currentQuizNum - 1] &&
      Array.isArray(quizList[currentQuizNum - 1].answer)
    ) {
      //handleSound();
      //setShouldSpeak(false); // 플래그 초기화
    }
  }, [quizList, currentQuizNum]);

  return (
    <Q.QnaModeLayout>
      {loading && !USE_MOCK ? (
        <Q.LoadingContainer>
          <Loading />
        </Q.LoadingContainer>
      ) : (
        <>
          <Q.QnaQuestionContainer>
            <Q.QuestionText>
              재생 버튼을 눌러 문장을 듣고, 들은 순서대로 차례로 나열해보세요!
            </Q.QuestionText>
            <Q.ListenupImg src={LISTENUP} />
            <Q.ListenAgainButton onClick={handleSound}>
              듣기
            </Q.ListenAgainButton>
            <Q.ConfirmButton onClick={handleCheckAnswer}>
              정답 확인
            </Q.ConfirmButton>
            <Q.QuizCount>
              {currentQuizNum} / {quizList.length}
            </Q.QuizCount>
          </Q.QnaQuestionContainer>

          {/* answer 문자열값 텍스트 길이에 맞게 늘어나도록 스타일 조정 필요 */}
          <Q.DropItemContainer>
            {droppedList.map((word, idx) => (
              <Q.DropItem
                key={idx}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(idx)}
                onClick={() => handleSlotClick(idx)}
              >
                {word}
              </Q.DropItem>
            ))}
          </Q.DropItemContainer>
          <Q.QnaBottomContainer>
            <AnswerOptionList
              options={dragList}
              isDraggable={true}
              onDragStart={handleDragStart}
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
  );
}
