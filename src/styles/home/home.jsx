import styled from "styled-components";
import colors from "../common/colors";
import { keyframes } from "styled-components";

// 위아래로 떠다니는 애니메이션
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

export const HomeLayout = styled.div`
  width: 100%;
  min-height: 400vh;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;

  @media (max-width: 768px) {
    min-height: auto;
  }
`;
export const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: -1;
  display: block;
  pointer-events: none;
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
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

export const HeaderBottomSection = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(1rem, 3vw, 2rem) 0 clamp(5rem, 8vw, 6rem);

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 4rem;
  }
`;

export const MainLogoAndButton = styled.div`
  width: min(100%, 860px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  padding: clamp(1rem, 2vw, 2rem);

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 2rem;
  }
`;

// 로고 아이콘1(오)
export const LogoIcon1 = styled.img`
  width: clamp(40px, 7vw, 76px);
  position: absolute;
  top: clamp(2rem, 7vw, 5.5rem);
  right: clamp(0.75rem, 8vw, 7rem);
  animation: ${float} 2s ease-in-out infinite;
  will-change: transform;

  @media (max-width: 768px) {
    top: 1.5rem;
    right: 0.25rem;
  }
`;

// 로고 아이콘2(왼)
export const LogoIcon2 = styled.img`
  width: clamp(48px, 8vw, 88px);
  position: absolute;
  top: clamp(7rem, 17vw, 12rem);
  left: clamp(0.5rem, 5vw, 5rem);
  animation: ${float} 2s ease-in-out infinite;
  will-change: transform;

  @media (max-width: 768px) {
    top: 7.75rem;
    left: 0;
  }
`;

export const LogoText = styled.p`
  margin-top: clamp(4rem, 10vw, 7rem);
  margin-bottom: 0;
  color: ${colors.brown};
  text-align: center;
  font-family: "Ownglyph_meetme-Rg";
  font-size: clamp(1.4rem, 3vw, 3rem);
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;

  @media (max-width: 768px) {
    max-width: 14ch;
  }
`;

export const LOGO = styled.img`
  width: min(100%, clamp(240px, 26vw, 460px));
  display: block;
`;

export const UploadPdfButton = styled.button`
  background: ${colors.orange};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: clamp(0.95rem, 1.6vw, 1.2rem) clamp(2rem, 7vw, 5.5rem);
  font-size: clamp(1.1rem, 3vw, 3rem);
  font-family: "Ownglyph_meetme-Rg";
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 430px);
  cursor: pointer;
  margin-top: clamp(0.75rem, 2vw, 1.5rem);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.12);
  transition: background 0.2s;
  text-align: center;

  &:hover {
    background: #ffa32d;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PencilImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
`;

export const ArrowDownButton = styled.button`
  position: absolute;
  bottom: clamp(1rem, 2.5vw, 2rem);
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
  width: clamp(36px, 4vw, 56px);
  height: auto;
`;

// 두번째 페이지
export const HomeSecondPage = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  margin-top: 0;
  position: relative;
  padding: 0 1rem;
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
  width: min(28vw, 540px);
  height: auto;
  flex-shrink: 0;
  border-radius: 32px;
  background: #fff;
  display: flex;
  flex-direction: ${({ isWide }) => (isWide ? "row" : "column")};
  padding: clamp(1.4rem, 3vw, 3rem);
  align-items: center;
  align-self: ${({ isWide }) => (isWide ? "center" : "unset")};
  gap: 1.2rem;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 5px 5px 5px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    border-radius: 24px;
  }
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
  gap: clamp(0.55rem, 0.8vw, 0.9rem);
`;
export const FeatureSubtitleText = styled.div`
  color: #7d4d00;
  font-family: "Noto Sans";
  font-size: clamp(1rem, 1.8vw, 1.8rem);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const FeatureTitleText = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: clamp(1.2rem, 2.2vw, 2.2rem);
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
  font-size: clamp(1rem, 2vw, 2rem);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
`;

// FeatureItem.jsx
export const FeatureItemContainer = styled.div`
  width: min(70%, 1100px);
  height: auto;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    width: min(82%, 760px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
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
  scroll-margin-top: 20vh;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
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
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 1rem;
`;

export const HomeFourthPage = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 1rem;
`;

export const RoadSection = styled.div`
  position: absolute;
  top: -100vh; // 전체 RoadImg의 원하는 부분만 보이도록 설정
  left: 0;
  width: 100vw;
  height: 300vh;
`;
