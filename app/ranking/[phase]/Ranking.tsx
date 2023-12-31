"use client";

import { useState } from "react";
import { css } from "../../../styled-system/css";
import type { Ranking } from "./page";

export function Ranking({ ranking }: { ranking: Ranking[] }) {
  const [isShowArray, setIsShowArray] = useState([false, false, false, false]);
  const changeShowArray = (index: number) => {
    const newArray = [...isShowArray];
    newArray[index] = true;
    setIsShowArray(newArray);
  };
  return (
    <div className={css({ p: "10px" })}>
      <h1
        className={css({
          fontWeight: "bold",
          fontSize: "52px",
          textAlign: "center",
          pb: "10px",
        })}
      >
        Ranking
      </h1>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr 480px",
          gap: "10px",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={ranking[i].teamId}
              className={css({
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                fontWeight: "bold",
                fontSize: "40px",
                bgColor: "white",
                padding: "20px",
                rounded: "30px",
                alignItems: "center",
              })}
              onClick={() => changeShowArray(i)}
            >
              <div
                className={css({
                  bgColor:
                    i === 0 ? "#DAA520" : i === 1 ? "#C0C0C0" : "#CD7F32",
                  rounded: "full",
                  w: "100px",
                  h: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                })}
              >
                {ranking[i].rank}位
              </div>
              <div>
                <div
                  className={css({
                    fontSize: "100px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "10px",
                    lineHeight: "100px",
                  })}
                  style={{
                    opacity: isShowArray[i] ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <p>{ranking[i].teamId}</p>
                  <p
                    className={css({
                      fontSize: "50px",
                      lineHeight: "50px",
                      mb: "10px",
                    })}
                  >
                    班
                  </p>
                </div>
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                    lineHeight: "50px",
                    gap: "10px",
                    fontSize: "32px",
                    mt: "10px",
                  })}
                  style={{
                    opacity: isShowArray[i] ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div>time: {ranking[i].time}</div>
                  <div>score: {ranking[i].score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {ranking?.length > 3 && (
            <ul
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              })}
              onClick={() => changeShowArray(3)}
            >
              {[...Array(7)].map((_, i) => (
                <li
                  key={ranking[i + 3].teamId}
                  className={css({
                    bgColor: "white",
                    fontWeight: "bold",
                    fontSize: "22px",
                    padding: "10px",
                    rounded: "20px",
                  })}
                >
                  <div
                    className={css({
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      w: "100%",
                    })}
                  >
                    <div
                      className={css({
                        fontSize: "28px",
                      })}
                    >
                      {ranking[i + 3].rank}位
                    </div>
                    <div
                      className={css({
                        fontSize: "40px",
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "5px",
                      })}
                      style={{
                        opacity: isShowArray[3] ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    >
                      <p>{ranking[i + 3].teamId}</p>
                      <p
                        className={css({
                          fontSize: "20px",
                          mb: "5px",
                        })}
                      >
                        班
                      </p>
                    </div>
                    <div
                      style={{
                        opacity: isShowArray[3] ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    >
                      score: {ranking[i + 3].score}
                    </div>
                    <div
                      style={{
                        opacity: isShowArray[3] ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    >
                      time: {ranking[i + 3].score}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
