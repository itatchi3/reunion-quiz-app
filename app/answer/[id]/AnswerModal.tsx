"use client";

import { css } from "../../../styled-system/css";

type Props = {
  teamId: string;
  answerText: string;
  isShowAnswer: boolean;
  isCorrect: boolean;
  closeModal: () => void;
};

export function AnswerModal({
  teamId,
  answerText,
  isShowAnswer,
  isCorrect,
  closeModal,
}: Props) {
  return (
    <div
      className={css({
        position: "fixed",
        top: "0",
        left: "0",
        h: "100vh",
        w: "100vw",
        p: "100px",
        bgColor: "rgba(0, 0, 0, 0.8)",
      })}
    >
      <button
        className={css({
          color: "white",
          position: "fixed",
          top: "100px",
          right: "150px",
          fontSize: "48px",
          fontWeight: "bold",
        })}
        onClick={() => closeModal()}
      >
        ✕
      </button>
      <div
        className={css({
          bgColor: isShowAnswer && isCorrect ? "red.700" : "blue.700",
          w: "800px",
          h: "600px",

          borderRadius: "32px",
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            h: "520px",
            w: "800px",
            color: "white",
            fontWeight: "bold",
            fontSize: "100px",
          })}
        >
          {answerText}
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            h: "80px",
            bgColor: "rgba(0, 0, 0, 0.3)",
            fontSize: "48px",
            fontWeight: "bold",
            color: "white",
            borderBottomRadius: "32px",
          })}
        >
          {teamId} 班
        </div>
      </div>
    </div>
  );
}
