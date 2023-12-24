"use client";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Answer } from "./page";
import { useRouter } from "next/navigation";
import { LinkButton } from "../../../components/LinkButton";
import { Quiz } from "../../quiz/[id]/page";
import { AnswerModal } from "./AnswerModal";

type Props = {
  quiz: Quiz;
  answers: Answer[];
  quizId: string;
};

export function Answers({ quiz, answers, quizId }: Props) {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTeamId, setModalTeamId] = useState("");

  return (
    <div>
      <div
        className={css({
          m: "0px 5px 10px",
          p: "10px",
          bgColor: "white",
          opacity: "80%",
          display: "flex",
          rounded: "lg",
          fontSize: "24px",
          fontWeight: "bold",
          flexFlow: "wrap",
        })}
      >
        Q{quizId}: {quiz.text}
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexFlow: "wrap",
          gap: "10px",
          w: "100%",
        })}
      >
        {answers.map((answer) => (
          <button
            key={answer.teamId}
            className={css({
              bgColor:
                isShowAnswer && answer.isCorrect ? "red.700" : "blue.700",
              w: "19%",
              h: "120px",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
              boxShadow: "0 4px 7px 3px rgba(0, 0, 0, .5)",
              borderRadius: "6px",
            })}
            onClick={() => {
              setIsOpenModal(true);
              setModalTeamId(answer.teamId);
            }}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                h: "100px",
              })}
            >
              {answer.answerText}
            </div>
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                h: "20px",
                bgColor: "rgba(0, 0, 0, 0.3)",
                fontSize: "16px",
                borderBottomRadius: "6px",
              })}
            >
              {answer.teamId} 班
            </div>
          </button>
        ))}
      </div>
      <div
        className={css({ display: "flex", justifyContent: "end", gap: "10px" })}
      >
        <LinkButton text="問題に戻る" path={`/quiz/${quizId}`} />
        <button
          className={css({
            bgColor: "white",
            borderRadius: "8px",
            fontWeight: "bold",
            padding: "5px 10px",
          })}
          onClick={() => setIsShowAnswer(true)}
        >
          答え合わせ
        </button>
        <LinkButton text="次の問題" path={`/quiz/${Number(quizId) + 1}`} />
      </div>
      {isOpenModal && (
        <AnswerModal
          teamId={modalTeamId}
          answerText={answers[Number(modalTeamId) - 1].answerText}
          isShowAnswer={isShowAnswer}
          isCorrect={answers[Number(modalTeamId) - 1].isCorrect}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
}
