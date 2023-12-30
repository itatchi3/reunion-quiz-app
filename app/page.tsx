import Image from "next/image";
import styles from "./page.module.css";
import { css } from "../styled-system/css";

export default function Home() {
  return (
    <main
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        h: "100vh",
        p: "10px",
      })}
    >
      <div
        className={css({
          fontSize: "100px",
          fontWeight: "bold",
        })}
      >
        北野高校128期
      </div>
      <div
        className={css({
          fontSize: "100px",
          fontWeight: "bold",
        })}
      >
        同窓会
      </div>
    </main>
  );
}
