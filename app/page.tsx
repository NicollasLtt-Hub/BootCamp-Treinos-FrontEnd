"use client";

import { authClient } from "@/app/_lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    router.replace("/auth");
    return null;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Bem-vindo ao FIT.AI!
      </h1>
    </div>
  );
}
