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
      className={css({ bgColor: "white", borderRadius: "full" })}
      onClick={() => router.push(path)}
    >
      {text}
    </button>
  );
};
