// components/home/RoadSection.jsx
import styled from "styled-components";
import { motion } from "framer-motion";
import ROAD from "../../assets/images/home/road.png";

const RoadWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const RoadImage = styled(motion.img)`
  width: 100%;
  height: auto;
  max-height: 150vw;
  object-fit: contain;
  pointer-events: none;
  position: absolute;
  z-index: 0;

  /* top 속성 대신 transform으로 이동하여 리플로우 방지 */
  transform: translateY(${({ top }) => top || "0"});
  left: ${({ left }) => left || "0"};
  right: ${({ right }) => right || "auto"};
  will-change: transform, opacity; /* GPU Hint 추가 */
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoadSection = ({ children, top = "0", left = "0", right = "auto" }) => (
  <RoadWrapper>
    <RoadImage
      src={ROAD}
      alt="도로 이미지"
      top={top}
      left={left}
      right={right}
      initial={{ y: 0, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      decoding="async"
    />
    <ContentWrapper>{children}</ContentWrapper>
  </RoadWrapper>
);

export default RoadSection;
