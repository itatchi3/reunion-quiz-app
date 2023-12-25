"use client";

import { useState } from "react";
import { css } from "../../styled-system/css";

export default function Admin() {
  const [key, setKey] = useState("");
  const [teamNum, setTeamNum] = useState(0);
  const [statusQuizId, setStatusQuizId] = useState("");

  return (
    <>
      <div>key</div>
      <input value={key} onChange={(e) => setKey(e.target.value)} />
      <div>チーム人数</div>
      <input
        value={teamNum}
        type="number"
        onChange={(e) => setTeamNum(Number(e.target.value))}
      />
      <button
        className={css({
          bgColor: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "5px 10px",
        })}
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/shuffle`, {
              headers: {
                "X-API-KEY": key,
              },
              body: JSON.stringify({ teamNum }),
            });
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
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/pushTeam`, {
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
      <button
        className={css({
          bgColor: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "5px 10px",
        })}
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/startAnswering`, {
              headers: {
                "X-API-KEY": key,
              },
            });
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
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/stopAnswering`, {
              headers: {
                "X-API-KEY": key,
              },
            });
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
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/changeStatus`, {
              headers: {
                "X-API-KEY": key,
              },
              body: JSON.stringify({ status: "BEFORE_STARTING_QUIZ" }),
            });
          } catch (error) {
            alert(error);
          }
        }}
      >
        回答を再開する
      </button>
      <div>回答チェック</div>
      <input
        type="number"
        value={statusQuizId}
        onChange={(e) => setStatusQuizId(e.target.value)}
      />
      <button
        className={css({
          bgColor: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "5px 10px",
        })}
        onClick={() => {
          try {
            fetch(`https://dosokai.raruku.com/api/admin/changeStatus`, {
              headers: {
                "X-API-KEY": key,
              },
            });
          } catch (error) {
            alert(error);
          }
        }}
      ></button>
    </>
  );
}
