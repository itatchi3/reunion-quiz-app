"use client";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Answer } from "./page";
import { LinkButton } from "../../../components/LinkButton";
import { Quiz } from "../../quiz/[id]/page";
import { AnswerModal } from "./AnswerModal";

type Props = {
  quiz: Quiz;
  answers: Answer[];
};

export function Answers({ quiz, answers }: Props) {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTeamId, setModalTeamId] = useState("");

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        h: "calc(100vh - 20px)",
      })}
    >
      <div>
        <div
          className={css({
            m: "0px 5px 5px",
            p: "5px",
            bgColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            rounded: "lg",
            fontSize: "24px",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            w: "calc(100vw - 20px)",
          })}
        >
          Q{quiz.quizId}: {quiz.text}
        </div>
        {quiz.options.length > 1 && (
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              flexFlow: "wrap",
              gap: "5px",
            })}
          >
            {quiz.options.map((option, i) => (
              <div
                key={option}
                className={css({
                  w: "calc(50% - 8px)",
                  p: "0 5px",
                  bgColor: "white",
                  display: "flex",
                  rounded: "lg",
                  fontSize: "24px",
                  fontWeight: "bold",
                  flexFlow: "wrap",
                  alignItems: "center",
                })}
              >
                <p
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    bgColor: "red.500",
                    borderRadius: "full",
                    w: "24px",
                    h: "24px",
                    color: "white",
                  })}
                >
                  {i + 1}
                </p>
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                    w: "calc(100% - 65px)",
                    fontSize: "24px",
                    fontWeight: "bold",
                  })}
                >
                  {option}
                </div>
              </div>
            ))}
          </div>
        )}
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
              h: quiz.quizId === 3 ? "95px" : "105px",
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
                alignItems:
                  answer.answerText.length <= 14 ? "center" : "flex-start",
                h: quiz.quizId === 3 ? "75px" : "85px",
                p: "10px",
                overflow: "hidden",
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
        <LinkButton text="問題に戻る" path={`/quiz/${quiz.quizId}`} />
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
        <LinkButton text="次の問題" path={`/quiz/${Number(quiz.quizId) + 1}`} />
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
