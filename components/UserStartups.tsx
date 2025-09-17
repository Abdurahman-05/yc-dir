

import StartupCard from "@/components/StartupCard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await prisma.startup.findMany({
    where: { authorId: id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  if (!startups) return notFound();
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup) => (
          <StartupCard key={startup.id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserStartups;
