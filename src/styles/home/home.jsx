import styled from "styled-components";
import colors from "../common/colors";
import MAINBG from "../../assets/images/home/bg.png";
//import MAINBG from "../../assets/images/home/mainbg.svg";

import { keyframes } from "styled-components";
import { style } from "framer-motion/client";

// import MAINBG from "../../assets/images/home/mainbg.svg";

// 위아래로 떠다니는 애니메이션
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
`;

// 깜빡이는 애니메이션
const sparkle = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

// 좌우로 살짝 움직이는 애니메이션
const drift = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(15px); }
  100% { transform: translateX(0); }
`;

export const HomeLayout = styled.div`
  width: 100%;
  height: 400vh;
  overflow: hidden; // 스크롤 안 되도록 막기
  scroll-behavior: smooth;
  position: relative; // 내부 요소 기준 포지셔닝을 위해 필요
`;
export const BackgroundImg = styled.img`
  position: absolute; // 스크롤 내리면 배경 따라 내려가도록
  top: -12vh;
  left: 0;
  width: 100vw;
  height: auto;
  min-height: 100%;
  z-index: -1;
  object-fit: contain; // 비율 유지 + 꽉 채우기
  display: block;
`;

export const RoadImg = styled.img`
  /* position: absolute;
  top: 85vh;
  left: 2vw;
  width: 100%;
  max-height: 150vw;
  z-index: 0;
  object-fit: contain;
  pointer-events: none;
  transform: translateX(0);
   */
`;
// 첫번째 페이지
export const HomeFirstPage = styled.div`
  position: relative;
  /* background: url(${MAINBG}) no-repeat center center;
  background-size: cover; // 배경 이미지를 꽉 채움
  background-attachment: fixed; // 배경이 뷰포트 기준으로 고정 */

  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderBottomSection = styled.div`
  position: relative;
  z-index: 10; // 구름보다 앞에
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const MainLogoAndButton = styled.div`
  // background-color:red;
  width: 60%;
  position: relative; // 부모
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 구름
export const Cloud = styled.img`
  width: 30vw; // 원하는 크기로 조정
  position: absolute; // 필요 시 위치 지정
  top: -6vh;
  right: -10vw;
  animation: ${drift} 5s ease-in-out infinite;
  will-change: transform;
`;

// 로고 아이콘1(오)
export const LogoIcon1 = styled.img`
  width: 8%; // 원하는 크기로 조정 가능
  position: absolute;
  top: 8vw;
  right: 20vh;
  animation: ${float} 2s ease-in-out infinite;
  will-change: transform;
`;

// 로고 아이콘2(왼)
export const LogoIcon2 = styled.img`
  width: 9%; // 원하는 크기로 조정 가능
  position: absolute;
  top: 19vw;
  left: 15vh;
  animation: ${float} 2s ease-in-out infinite;
  will-change: transform;
`;

export const LogoText = styled.p`
  margin-top: 10vw;
  margin-bottom: 1.2vw;
  color: ${colors.brown};
  text-align: center;
  // text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  font-family: "Ownglyph_meetme-Rg";
  font-size: 2vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LOGO = styled.img`
  width: 24vw;

  display: block;
`;

export const UploadPdfButton = styled.button`
  background: ${colors.orange};
  color: #fff;
  border: none;
  border-radius: 2vw;
  padding: 1.3vw 7.5vw;
  font-size: 1.8vw;
  font-family: "Ownglyph_meetme-Rg";
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7vw;
  cursor: pointer;
  margin-top: 2vw;
  box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.08);
  transition: background 0.2s;

  &:hover {
    background: #ffa32d; // 원하는 색상으로 변경
  }
`;

export const PencilImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
`;

export const ArrowDownButton = styled.button`
  position: fixed; // 고정
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  animation: ${blink} 1.5s infinite ease-in-out;
  will-change: opacity;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ArrowDownImg = styled.img`
  width: 4.5vw;
  height: 5vh;
`;

// 두번째 페이지
export const HomeSecondPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // 내용이 넘치지 않도록
  box-sizing: border-box;
  margin-top: 0;
  position: relative;
`;

export const FeatureCardWrapper = styled.div`
  width: 40vw;
  min-height: 90%; // 🔥 전체 화면 높이 확보
`;

export const FeatureCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열 구성
  grid-row-gap: 2rem; // 행 사이 간격
  grid-column-gap: 2rem; // 열 사이 간격
  max-width: 100%;
  margin: 0 auto;

  // 마지막 카드 가운데 정렬
  & > div:last-child {
    grid-column: span 2;
  }
`;

// 두번째 페이지 - 기능 설명 카드
export const FeatureCardLayout = styled.div`
  width: 28vw;
  height: auto;
  flex-shrink: 0;
  border-radius: 40px;
  background: #fff;
  display: flex;
  flex-direction: ${({ isWide }) => (isWide ? "row" : "column")};
  padding: 3rem;
  align-items: center;
  align-self: ${({ isWide }) => (isWide ? "center" : "unset")}; // 가운데 정렬
  gap: 1.2rem;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 5px 5px 5px 3px rgba(0, 0, 0, 0.5);
`;

export const FeatureImgBox = styled.div`
  width: ${({ isWide }) => (isWide ? "50%" : "100%")};
  height: ${({ isWide }) => (isWide ? "100%" : "52%")};
  flex-shrink: 0;
  border-radius: 20px;
  border: 4px solid #c3ea8e;
  padding: 22px;
`;
export const FeatureImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const FeatureTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
`;
export const FeatureSubtitleText = styled.div`
  color: #7d4d00;
  font-family: "Noto Sans";
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const FeatureTitleText = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Highlight = styled.span`
  color: #ff9123;
  font-weight: 700;
`;

export const FeatureDescriptionText = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: pre-line; // 줄바꿈
  word-break: break-word; // 긴 단어가 넘칠 경우 줄바꿈
  overflow-wrap: break-word;
`;

// FeatureItem.jsx
export const FeatureItemContainer = styled.div`
  width: 70%;
  height: auto;
  position: relative;
  z-index: 1;
`;
export const FeatureCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ $position }) =>
    $position === "right" ? "row-reverse" : "row"};
  align-items: center;
  gap: 1.5rem;
  position: relative;
  justify-content: space-between;
  //margin-bottom: 21vw;
  scroll-margin-top: 20vh;
`;

export const StepP = styled.div`
  width: 30%;
  text-align: center;
  font-size: 6.5rem;
  font-family: "Pretendard";
  font-weight: bold;
  color: ${colors.brown};
  text-align: center;
`;

// 세번째 페이지
export const HomeThirdPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // 내용이 넘치지 않도록
`;

export const HomeFourthPage = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const RoadSection = styled.div`
  position: absolute;
  top: -100vh; // 전체 RoadImg의 원하는 부분만 보이도록 설정
  left: 0;
  width: 100vw;
  height: 300vh;
`;
