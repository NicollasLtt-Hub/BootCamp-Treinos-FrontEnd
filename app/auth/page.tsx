"use client";

import { authClient } from "@/app/_lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInWithGoogle } from "./_components/sign-in-with-google";

const AuthPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.replace("/");
        }
    }, [session, router]);

    if (isPending || session) {
        return null;
    }

    return (
        <div className="relative flex min-h-dvh flex-col">
            <Image
                src="/login-bg.png"
                alt=""
                fill
                className="object-cover"
                priority
            />

            <div className="relative z-10 flex flex-1 items-center justify-center">
                <Image
                    src="/fit-ai-logo.svg"
                    alt="FIT.AI"
                    width={85}
                    height={38}
                    priority
                />
            </div>



            <div className="relative z-10 flex flex-col items-center gap-12 rounded-t-3xl bg-primary px-5 pb-10 pt-12">
                <div className="flex flex-col items-center gap-6">
                    <h1 className="max-w-[362px] text-center font-[family-name:var(--font-inter-tight)] text-[32px] font-semibold leading-[33.6px] text-primary-foreground">
                        O app que vai transformar a forma como você treina.
                    </h1>

                    <SignInWithGoogle />
                </div>

                <p className="text-center font-[family-name:var(--font-inter-tight)] text-xs text-primary-foreground/70">
                    ©2026 Copyright FIT.AI. Todos os direitos reservados
                </p>
            </div>
        </div>
    );
};

export default AuthPage;