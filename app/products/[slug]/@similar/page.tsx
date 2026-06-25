import SimilarProducts from "../_components/similar-products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SimilarSlot({ params }: Props) {
  const { slug } = await params;
  return <SimilarProducts slug={slug} />;
}
