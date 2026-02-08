import React from "react";
import * as Q from "../../../styles/quiz/quiz.jsx";

export default function AnswerOptionList({
  options,
  selectedIdx,
  onClick,
  isDraggable = false,
  onDragStart,
  mode,
}) {
  console.log("AnswerOptionList Rendered");
  return (
    <Q.AswerOptionItemContainer $mode={mode}>
      {options.map((word, idx) =>
        word ? (
          isDraggable ? (
            <Q.DraaggableItem
              key={idx}
              draggable
              onDragStart={() => onDragStart(idx)}
            >
              {word}
            </Q.DraaggableItem>
          ) : (
            <Q.OptionItem
              key={idx}
              onClick={() => onClick(idx)}
              $isSelected={selectedIdx === idx}
            >
              {word}
            </Q.OptionItem>
          )
        ) : null
      )}
    </Q.AswerOptionItemContainer>
  );
}
