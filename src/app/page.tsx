import Link from "next/link";

import { LatestPost } from "@/components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main>
        
     </main>
    </HydrateClient>
  );
}
