import { destinations } from "@/data/destinations";
import { DestinationDetail } from "./DestinationDetail";

export function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }));
}

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DestinationDetail id={id} />;
}
