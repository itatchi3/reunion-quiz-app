"use client";

import { useState } from "react";
import { css } from "../../styled-system/css";

export default function Admin() {
  const [key, setKey] = useState("");
  const [teamNum, setTeamNum] = useState("");
  const [statusQuizId, setStatusQuizId] = useState("");
  const [answerQuizId, setAnswerQuizId] = useState("");
  const [checkedTeamValues, setCheckedTeamValues] = useState<string[]>([]);

  const handleChangeCheckBox = (e: any) => {
    if (checkedTeamValues.includes(e.target.value)) {
      setCheckedTeamValues(
        checkedTeamValues.filter(
          (checkedValue) => checkedValue !== e.target.value
        )
      );
    } else {
      setCheckedTeamValues([...checkedTeamValues, e.target.value]);
    }
  };
  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        gap: "20px",
        p: "20px",
      })}
    >
      <div>
        <div
          className={css({
            fontSize: "24px",
            fontWeight: "bold",
          })}
        >
          key
        </div>
        <input
          className={css({
            h: "34px",
          })}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div>
        <p
          className={css({
            fontSize: "24px",
            fontWeight: "bold",
          })}
        >
          チーム
        </p>
        <p
          className={css({
            fontWeight: "bold",
          })}
        >
          人数
        </p>
        <input
          className={css({
            h: "34px",
            mb: "10px",
          })}
          value={teamNum}
          type="number"
          onChange={(e) => setTeamNum(e.target.value)}
        />
        <div
          className={css({
            display: "flex",
            gap: "10px",
          })}
        >
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                await fetch(
                  `https://dosokai.raruku.com/api/admin/shuffle?userPerTeam=${teamNum}`,
                  {
                    headers: {
                      "X-API-KEY": key,
                    },
                  }
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            チーム決定
          </button>
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                await fetch(`https://dosokai.raruku.com/api/admin/pushTeam`, {
                  headers: {
                    "X-API-KEY": key,
                  },
                });
              } catch (error) {
                alert(error);
              }
            }}
          >
            チーム配信
          </button>
        </div>
      </div>
      <div>
        <div
          className={css({
            fontSize: "24px",
            fontWeight: "bold",
          })}
        >
          回答
        </div>
        <div
          className={css({
            display: "flex",
            gap: "10px",
          })}
        >
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                await fetch(
                  `https://dosokai.raruku.com/api/admin/startAnswering`,
                  {
                    method: "PUT",
                    headers: {
                      "X-API-KEY": key,
                    },
                  }
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            回答はじめ
          </button>
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                await fetch(
                  `https://dosokai.raruku.com/api/admin/stopAnswering`,
                  {
                    method: "PUT",
                    headers: {
                      "X-API-KEY": key,
                    },
                  }
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            回答終了
          </button>
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                await fetch(
                  `https://dosokai.raruku.com/api/admin/changeStatus`,
                  {
                    method: "PUT",
                    headers: {
                      "X-API-KEY": key,
                    },
                    body: JSON.stringify({ status: "BEFORE_STARTING_QUIZ" }),
                  }
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            回答を再開する
          </button>
        </div>
      </div>
      <div>
        <p
          className={css({
            fontSize: "24px",
            fontWeight: "bold",
          })}
        >
          クイズステータス
        </p>
        <p
          className={css({
            fontWeight: "bold",
          })}
        >
          問題番号
        </p>
        <input
          className={css({
            h: "34px",
            mb: "10px",
          })}
          type="number"
          value={statusQuizId}
          onChange={(e) => setStatusQuizId(e.target.value)}
        />
        <div
          className={css({
            display: "flex",
            gap: "10px",
          })}
        >
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                const res = await fetch(
                  `https://dosokai.raruku.com/api/admin/quiz/currentStatus`,
                  {
                    headers: {
                      "X-API-KEY": key,
                    },
                  }
                );
                const resJson = await res.json();
                if (resJson.ok) {
                  alert("全チーム回答しました");
                } else {
                  alert(
                    `まだチーム${resJson.notAnswerTeams.join(
                      ","
                    )}が回答していません`
                  );
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            今の問題
          </button>
          <button
            className={css({
              bgColor: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "5px 10px",
            })}
            onClick={async () => {
              try {
                const res = await fetch(
                  `https://dosokai.raruku.com/api/admin/quiz/${statusQuizId}/status`,
                  {
                    headers: {
                      "X-API-KEY": key,
                    },
                  }
                );
                const resJson = await res.json();
                if (resJson.ok) {
                  alert("全チーム回答しました");
                } else {
                  alert(
                    `まだチーム${resJson.notAnswerTeams.join(
                      ","
                    )}が回答していません`
                  );
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            入力したIDの問題
          </button>
        </div>
      </div>
      <div>
        <p className={css({ fontSize: "24px", fontWeight: "bold" })}>
          答え合わせ
        </p>
        <p
          className={css({
            fontWeight: "bold",
          })}
        >
          問題番号
        </p>
        <input
          className={css({
            h: "34px",
            mb: "10px",
          })}
          type="number"
          value={answerQuizId}
          onChange={(e) => setAnswerQuizId(e.target.value)}
        />
        <p
          className={css({
            fontWeight: "bold",
          })}
        >
          正解チーム
        </p>
        <div
          className={css({
            display: "flex",
            gap: "10px",
            mb: "10px",
          })}
        >
          {[...Array(25)].map((_, i) => (
            <label
              key={i}
              className={css({
                display: "flex",
                alignItems: "center",
              })}
            >
              {i + 1}
              <input
                type="checkbox"
                className={css({
                  w: "18px",
                  h: "18px",
                  ml: "2px",
                })}
                value={i + 1}
                onChange={handleChangeCheckBox}
                checked={checkedTeamValues.includes((i + 1).toString())}
              />
            </label>
          ))}
        </div>
        <button
          className={css({
            bgColor: "white",
            borderRadius: "8px",
            fontWeight: "bold",
            padding: "5px 10px",
          })}
          onClick={async () => {
            try {
              await fetch(
                `https://dosokai.raruku.com/api/admin/quiz/${answerQuizId}/correct`,
                {
                  method: "PUT",
                  headers: {
                    "X-API-KEY": key,
                  },
                  body: JSON.stringify({ correctTeamIds: checkedTeamValues }),
                }
              );
              alert("採点を送信しました");
            } catch (error) {
              alert(error);
            }
          }}
        >
          採点を送信
        </button>
      </div>
    </div>
  );
}
