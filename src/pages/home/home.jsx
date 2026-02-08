import * as S from "../../styles/home/home";
import FeatureCard from "../../components/home/FeatureCard";
import { useRef, useEffect } from "react";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import FeatureItem from "../../components/home/FeatureItem";
import RoadSection from "../../components/home/RoadSection";
// image
import ARROWDOWN from "../../assets/images/home/arrow-down.svg";
import MAINBG from "../../assets/images/home/bg.png";
import ROAD from "../../assets/images/home/road.png";

// image
import FEATURE1 from "../../assets/images/home/home-feature1.svg";
import FEATURE2 from "../../assets/images/home/home-feature2.svg";
import FEATURE3 from "../../assets/images/home/home-feature3.svg";

//import HOMEFRAME from "../../assets/images/home/homeframe.svg";
import LOGO from "../../assets/images/header/logo.png";
import LOGOIcon1 from "../../assets/images/home/icon1.png";
import LOGOIcon2 from "../../assets/images/home/icon2.png";
import Cloud from "../../assets/images/home/cloud.png";

const Home = () => {
  const outerDivRef = useRef();
  const firstPageRef = useRef();
  const secondPageRef = useRef();
  const thirdPageRef = useRef();
  const fourthPageRef = useRef();
  const currentPageRef = useRef(1); // State 대신 Ref로 페이지 추적하여 리렌더링 방지
  const navigate = useNavigate();

  // 자동으로 페이지 내려가도록 하는 메서드
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextPage();
    }, 4000); // 4초마다

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []); // 의존성 배열 비움 (ref 사용하므로 재실행 불필요)

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    let nextPageRef;
    let nextPage;

    const current = currentPageRef.current; // Ref에서 현재 값 읽기

    if (current === 1) {
      //1->2
      nextPageRef = secondPageRef;
      nextPage = 2;
    } else if (current === 2) {
      //2->3
      nextPageRef = thirdPageRef;
      nextPage = 3;
    } else if (current === 3) {
      //3->4
      nextPageRef = fourthPageRef;
      nextPage = 4;
    } else {
      nextPageRef = firstPageRef; //4->1
      nextPage = 1;
    }

    if (nextPageRef && nextPageRef.current) {
      const topOffset = nextPageRef.current.offsetTop;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      currentPageRef.current = nextPage; // Ref 값 업데이트 (리렌더링 X)
    }
  };

  // list 페이지로 이동
  const handleUpladButton = () => {
    navigate("/list");
  };

  return (
    <S.HomeLayout ref={outerDivRef}>
      <S.BackgroundImg src={MAINBG} alt="배경" />
      {/* <S.RoadImg src={ROAD} alt="도로" /> */}
      {/* 첫번째 페이지 */}
      <S.HomeFirstPage ref={firstPageRef}>
        <Header />
        <S.HeaderBottomSection>
          <S.Cloud src={Cloud}></S.Cloud>
          <S.MainLogoAndButton>
            <S.LogoIcon1 src={LOGOIcon1}></S.LogoIcon1>
            <S.LogoIcon2 src={LOGOIcon2}></S.LogoIcon2>
            {/* <S.HomeFrameImg src={HOMEFRAME} alt="메인 홈 로고"></S.HomeFrameImg> */}
            <S.LogoText>줄글의 미로에서, 지식의 지도까지</S.LogoText>
            <S.LOGO src={LOGO} />
            <S.UploadPdfButton onClick={handleUpladButton}>
              PDF 업로드로 시작해보기
            </S.UploadPdfButton>
          </S.MainLogoAndButton>
          <S.ArrowDownButton onClick={goToNextPage}>
            <S.ArrowDownImg src={ARROWDOWN} alt="아래로 이동" />
          </S.ArrowDownButton>
        </S.HeaderBottomSection>
        {/* <RoadSection top="20vh" left="6.6vw" /> */}
      </S.HomeFirstPage>
      {/* 두번째 페이지 */}
 {/*      <S.HomeSecondPage ref={secondPageRef}>
        <RoadSection top="-14.5vh">
          <FeatureItem
            img={FEATURE1}
            subtitle={"어려운 개념을 한눈에 이해하는"}
            title={
              <>
                <S.Highlight>개념지도</S.Highlight>를 이용한 시각적 학습
              </>
            }
            description={`복잡한 설명도 지식그래프로 시각화해 한눈에 이해할 수 있어요. 

          학습자료를 핵심 개념과 관계 중심으로 재구성해, 자료의 내용을 쉽고 빠르게 이해할 수 있습니다.
          
          각 개념에는 음성 설명이 함께 제공되며, 듣기 기반 학습이 가능합니다.`}
            position="right"
          />
        </RoadSection>
        <S.ArrowDownButton onClick={goToNextPage}>
          <S.ArrowDownImg src={ARROWDOWN} alt="아래로 이동" />
        </S.ArrowDownButton>
      </S.HomeSecondPage> */}
      {/* 세번째 페이지 */}
{/*       <S.HomeThirdPage ref={thirdPageRef}>
        <RoadSection top="-114vh">
          <FeatureItem
            img={FEATURE2}
            subtitle={"재미있게 익히는 개념 공부!"}
            title={
              <>
                <S.Highlight>퀴즈</S.Highlight>를 통한
                <S.Highlight> 개념 복습</S.Highlight>
              </>
            }
            description={`학습자가 재미있게 개념을 익힐 수 있도록, 
          총 3가지 퀴즈 유형을 통해 학습 내용을 복습합니다.

- 귀로 듣고 문장 순서 맞추기
- 관련 단어 고르기
- 문장 완성하기

게임처럼 풀어보며 자연스럽게 개념을 반복 학습할 수 있어요.
즐겁고 몰입감 있는 환경 속에서 학습 효과도 함께 높여보세요!`}
            delay={0}
          />
        </RoadSection>

        <S.ArrowDownButton onClick={goToNextPage}>
          <S.ArrowDownImg src={ARROWDOWN} alt="처음으로" />
        </S.ArrowDownButton>
      </S.HomeThirdPage>
      <S.HomeFourthPage ref={fourthPageRef}>
        <RoadSection top="-214vh">
          <FeatureItem
            img={FEATURE3}
            subtitle={"공부하다가 모르는 개념이 나오면?"}
            title={
              <>
                <S.Highlight>맞춤형 챗봇</S.Highlight>으로 질문하기
              </>
            }
            description={`학습 중 이해되지 않는 개념이 있을 때, 챗봇에게 질문하면
          지식 그래프 기반으로 정확하고 친절한 설명을 제공합니다.`}
            position="right"
            delay={0}
          />
        </RoadSection>
        <S.ArrowDownButton onClick={goToNextPage}>
          <S.ArrowDownImg src={ARROWDOWN} alt="처음으로" />
        </S.ArrowDownButton>
      </S.HomeFourthPage> */}
    </S.HomeLayout>
  );
};

export default Home;
