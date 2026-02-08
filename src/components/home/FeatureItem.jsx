import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";
import * as S from "../../styles/home/home";
// image
import FEATURE1 from "../../assets/images/home/feature1.svg";
import FEATURE2 from "../../assets/images/home/feature2.svg";
import FEATURE3 from "../../assets/images/home/feature3.svg";

export default function FeatureItem({
  img,
  subtitle,
  title,
  description,
  position = "left",
  delay = 0,
}) {
  return (
    <S.FeatureItemContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        viewport={{ once: true }}
      >
        <S.FeatureCardContainer $position={position}>
          {/* <S.StepP>STEP 01</S.StepP> */}

          <FeatureCard
            img={img}
            subtitle={subtitle}
            title={title}
            description={description}
          />
        </S.FeatureCardContainer>
      </motion.div>
    </S.FeatureItemContainer>
  );
}
