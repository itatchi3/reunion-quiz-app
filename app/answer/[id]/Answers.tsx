"use client";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Answer } from "./page";
import { useRouter } from "next/navigation";
import { LinkButton } from "../../../components/LinkButton";

type Props = {
  answers: Answer[];
  quizId: string;
};

export function Answers({ answers, quizId }: Props) {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const router = useRouter();

  return (
    <div>
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
          <div
            key={answer.teamId}
            className={css({
              bgColor: isShowAnswer && answer.correct ? "red.700" : "blue.700",
              w: "19%",
              h: "120px",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
              boxShadow: "0 4px 7px 3px rgba(0, 0, 0, .5)",
              borderRadius: "6px",
            })}
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
          </div>
        ))}
      </div>
      <div className={css({ display: "flex", justifyContent: "end" })}>
        <LinkButton text="問題に戻る" path={`/quiz/${quizId}`} />
        <button
          className={css({ bgColor: "white", borderRadius: "full" })}
          onClick={() => setIsShowAnswer(true)}
        >
          答え合わせ
        </button>
        <LinkButton text="次の問題" path={`/quiz/${Number(quizId) + 1}`} />
      </div>
    </div>
  );
}
