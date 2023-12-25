import Image from "next/image";
import { LinkButton } from "../../../components/LinkButton";
import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";

export type Quiz = {
  quizId: string;
  type: "CHOICE" | "IMAGE" | "FREE";
  text: string;
  options: string[];
};

const fetchImage = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/quiz/${id}/image`, {
    headers: {
      "X-API-KEY": process.env.X_API_KEY || "",
    },
    cache: "no-store",
  });
  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");
  return `data:image/jpeg;base64,${base64Image}`;
};

export default async function Quiz({ params }: { params: { id: string } }) {
  try {
    const quiz = (await fetchClient(`/api/quiz/${params.id}`, {
      cache: "no-store",
    })) as Quiz;

    console.log(quiz);

    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          h: "100vh",
          justifyContent: "space-between",
          p: "15px 15px 10px",
          gap: "10px",
        })}
      >
        <div
          className={css({
            bgColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "30px",
            w: "100%",
            h: "100%",
            p: "30px",
            boxShadow: "0 10px 16px 0 rgba(0, 0, 0, .5)",
          })}
        >
          {quiz.type === "CHOICE" && (
            <div
              key={quiz.quizId}
              className={css({
                display: "flex",
                flexDirection: "column",
                h: "100%",
                justifyContent: "space-between",
              })}
            >
              <div className={css({ display: "flex", gap: "20px" })}>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.quizId}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>

              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                })}
              >
                {quiz.options.map((option, i) => (
                  <div
                    key={option}
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      bgColor: "white",
                      rounded: "20px",
                    })}
                  >
                    <p
                      className={css({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                        fontWeight: "bold",
                        bgColor: "red.400",
                        borderRadius: "full",
                        w: "45px",
                        h: "45px",
                        ml: "10px",
                      })}
                    >
                      {i + 1}
                    </p>
                    <p
                      className={css({
                        display: "flex",
                        justifyContent: "center",
                        w: "calc(100% - 65px)",
                        fontSize: "48px",
                        fontWeight: "bold",
                      })}
                    >
                      {option}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {quiz.type === "IMAGE" && (
            <div key={quiz.quizId}>
              <div className={css({ display: "flex", gap: "20px" })}>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.quizId}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>
              <Image
                src={await fetchImage(params.id)}
                width={800}
                height={600}
                alt="quiz"
                color="white"
              />
            </div>
          )}
          {quiz.type === "FREE" && (
            <div key={quiz.quizId}>
              <div className={css({ display: "flex", gap: "20px" })}>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.quizId}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>
              <p
                className={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  h: "50vh",
                  fontSize: "90px",
                  fontWeight: "bold",
                })}
              >
                自由記述
              </p>
            </div>
          )}
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "end",
            gap: "10px",
          })}
        >
          {params.id !== "1" && (
            <LinkButton
              text="前の問題"
              path={`/answer/${Number(params.id) - 1}`}
            />
          )}
          <LinkButton text="回答一覧" path={`/answer/${params.id}`} />
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>データがありません</div>;
  }
}
