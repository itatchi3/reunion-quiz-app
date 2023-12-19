import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";

type Quiz = {
  id: number;
  type: "CHOICE" | "IMAGE" | "FREE";
  text: string;
  options: string[];
};

export default async function Quiz({ params }: { params: { id: number } }) {
  try {
    const quiz = (await fetchClient(`/api/quiz/${params.id}`, {
      cache: "no-store",
    })) as Quiz;

    console.log(quiz);

    return (
      <div
        className={css({
          h: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgColor: "#FFFFFF",
            w: "90%",
            h: "90%",
            opacity: "80%",
            borderRadius: "48px",
            p: "48px",
            boxShadow: "0 10px 16px 0 rgba(0, 0, 0, .5)",
          })}
        >
          {quiz.type === "CHOICE" && (
            <div key={quiz.id}>
              <div>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.id}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                })}
              >
                {quiz.options.map((option, i) => (
                  <div key={option} className={css({})}>
                    <p
                      className={css({ fontSize: "48px", fontWeight: "bold" })}
                    >
                      {i + 1} {option}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {quiz.type === "IMAGE" && (
            <div key={quiz.id}>
              <div>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.id}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>
            </div>
          )}
          {quiz.type === "FREE" && (
            <div key={quiz.id}>
              <div>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  Q{quiz.id}
                </p>
                <p className={css({ fontSize: "48px", fontWeight: "bold" })}>
                  {quiz.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>データがありません</div>;
  }
}
