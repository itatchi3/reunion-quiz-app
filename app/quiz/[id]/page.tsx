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
        <Box
          style={{
            backgroundColor: "#FFFFFF",
            width: "90%",
            height: "90%",
            opacity: "80%",
            borderRadius: "100px",
            padding: "100px",
          }}
        >
          <Text size="80px" fw="bold">
            {quiz.text}
          </Text>
          {quiz.options.map((option, i) => (
            <Grid key={option}>
              <Box>
                <Text size="72px" fw="bold">
                  {i}
                </Text>
                <Text size="72px" fw="bold">
                  {option}
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>
      )}
    </Center>
  );
}

export async function generateStaticParams() {
  return [...Array(10)].map((_, i) => {
    id: i;
  });
}
