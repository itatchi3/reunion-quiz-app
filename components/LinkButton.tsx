"use client";
import { useRouter } from "next/navigation";
import { css } from "../styled-system/css";

type Props = {
  text: string;
  path: string;
};

export const LinkButton = ({ text, path }: Props) => {
  const router = useRouter();
  return (
    <button
      //TODO: 何故かpanda cssが効かない
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        fontWeight: "bold",
        padding: "5px 10px",
      }}
      onClick={() => router.push(path)}
    >
      {text}
    </button>
  );
};
