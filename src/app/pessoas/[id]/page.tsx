import { users } from "@/data/users";
import { PersonProfile } from "./PersonProfile";

export function generateStaticParams() {
  return users.map((u) => ({ id: u.id }));
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PersonProfile id={id} />;
}
