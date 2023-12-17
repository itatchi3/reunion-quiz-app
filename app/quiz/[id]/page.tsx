'use client'

import { Box, Center, Flex, Grid, Text } from "@mantine/core";
import { fetchClient } from "../../../hooks/fetchClient";
import { use, useEffect, useState } from "react";

type Quiz = {
  id: number;
  type: "CHOICE" | "IMAGE";
  text: string;
  options: string[];
};

export default  function Quiz({ params }: { params: { id: number } }) {
  const [quiz, setQuiz] = useState<Quiz | undefined>();

  useEffect(() => {
    const getData = async () => {
      try{
        const data = (await fetchClient(`/api/quiz/${params.id}`, {
          cache: "no-store",
        })) as Quiz
        setQuiz(data)
        }catch(e){
        console.error(e)
        }
    }
    getData()
  }, [quiz, params.id])


    return (
      <Center h="100%">
        {quiz?.type === "CHOICE" && (
          <Flex
            direction="column"
            justify="space-between"
            style={{
              backgroundColor: "#FFFFFF",
              width: "90%",
              height: "90%",
              opacity: "85%",
              borderRadius: "48px",
              padding: "48px",
              boxShadow: "0 10px 16px 0 rgba(0, 0, 0, .5)",
            }}
          >
            <Box>
              <Text size="48px" fw="bold">
                Q{quiz.id}
              </Text>
              <Text size="48px" fw="bold">
                {quiz.text}
              </Text>{" "}
            </Box>
            <Grid>
              {quiz.options.map((option, i) => (
                <Box
                  key={option}
                  style={{
                    width: "50%",
                    padding: "16px",
                  }}
                >
                  <Text size="48px" fw="bold">
                    {i + 1} {option}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Flex>
        )}
      </Center>
    );
}

// export async function generateStaticParams() {
//   return [...Array(10)].map((_, i) => {
//     id: i;
//   });
// }
