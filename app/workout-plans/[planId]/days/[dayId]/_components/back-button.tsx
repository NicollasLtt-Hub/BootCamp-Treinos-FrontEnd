"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="p-2">
            <ChevronLeft className="size-6 text-foreground" />
        </button>
    );
}
