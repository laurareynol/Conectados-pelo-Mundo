import { jobs } from "@/data/jobs";
import { JobDetail } from "./JobDetail";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JobDetail id={id} />;
}
