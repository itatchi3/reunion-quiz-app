export default function Answer({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}

export async function generateStaticParams() {
  return [...Array(10)].map((_, i) => {
    id: i.toString();
  });
}
