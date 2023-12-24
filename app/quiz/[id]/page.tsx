import { LinkButton } from "../../../components/LinkButton";
import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";

export type Quiz = {
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

    if (quiz.type === "IMAGE") {
      console.log("image");
      try {
        const quiz2 = await fetchClient(`/api/quiz/${params.id}/image`, {
          cache: "no-store",
        });
        console.log(quiz2);
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div>
        <div
          className={css({
            h: "95vh",
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
                        className={css({
                          fontSize: "48px",
                          fontWeight: "bold",
                        })}
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
        <div className={css({ display: "flex", justifyContent: "end" })}>
          <LinkButton text="回答一覧" path={`/answer/${params.id}`} />
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>データがありません</div>;
  }
}
