import { Box, Center, Flex, Grid, Text } from "@mantine/core";

type Quiz = {
  id: number;
  type: "CHOICE" | "IMAGE";
  text: string;
  options: string[];
};

export default async function Quiz({ params }: { params: { id: number } }) {
  // const quiz = (await fetch(
  //   `${process.env.API_URL}/api/quiz/${params.id}`
  // ).then((res) => res.json())) as Quiz;

  const quiz = {
    id: 1,
    text: "2016年発行の卒業アルバムには、部活動、同好会ごとの集合写真が載ったページがあります。その中で、一番人数が多い部活動・同好会は次のうちどれでしょう？",
    type: "CHOICE",
    options: ["野球部", "サッカー部", "吹奏楽部", "女子ハンドボール部"],
  };
  return (
    <Center h="100%">
      {quiz.type === "CHOICE" && (
        <Flex
          direction="column"
          justify="space-between"
          style={{
            backgroundColor: "#FFFFFF",
            width: "90%",
            height: "90%",
            opacity: "80%",
            borderRadius: "100px",
            padding: "100px",
          }}
        >
          <Box>
            <Text size="96px" fw="bold">
              Q{quiz.id}
            </Text>
            <Text size="96px" fw="bold">
              {quiz.text}
            </Text>{" "}
          </Box>
          <Grid>
            {quiz.options.map((option, i) => (
              <Box
                key={option}
                style={{
                  backgroundColor: "#FFFFFF",
                  width: "50%",
                  opacity: "100%",
                  borderRadius: "32px",
                  padding: "32px",
                }}
              >
                <Text size="96px" fw="bold">
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

export async function generateStaticParams() {
  return [...Array(10)].map((_, i) => {
    id: i;
  });
}
