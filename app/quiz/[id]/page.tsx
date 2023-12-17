import { Box, Center, Flex, Grid, Text } from "@mantine/core";
import { fetchClient } from "../../../hooks/fetchClient";

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

    return (
      <Center h="100%">
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
          {quiz.type === "CHOICE" && (
            <Box key={quiz.id}>
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
            </Box>
          )}
          {quiz.type === "IMAGE" && (
            <Box key={quiz.id}>
              <Box>
                <Text size="48px" fw="bold">
                  Q{quiz.id}
                </Text>
                <Text size="48px" fw="bold">
                  {quiz.text}
                </Text>
              </Box>
            </Box>
          )}
          {quiz.type === "FREE" && (
            <Box key={quiz.id}>
              <Box>
                <Text size="48px" fw="bold">
                  Q{quiz.id}
                </Text>
                <Text size="48px" fw="bold">
                  {quiz.text}
                </Text>
              </Box>
            </Box>
          )}
        </Flex>
      </Center>
    );
  } catch (error: any) {
    return <div>データがありません</div>;
  }
}
