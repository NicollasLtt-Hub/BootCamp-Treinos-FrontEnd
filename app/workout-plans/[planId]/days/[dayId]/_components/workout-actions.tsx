"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startWorkoutSessionAction } from "../_actions";
import { Button } from "@/components/ui/button";

interface WorkoutActionsProps {
    workoutPlanId: string;
    workoutDayId: string;
    sessionState: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export function WorkoutActions({ workoutPlanId, workoutDayId, sessionState }: WorkoutActionsProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleStartWorkout = async () => {
        try {
            setIsPending(true);
            await startWorkoutSessionAction(workoutPlanId, workoutDayId);
            router.refresh();
        } catch (error) {
            console.error("Failed to start workout session", error);
        } finally {
            setIsPending(false);
        }
    };

    if (sessionState === "COMPLETED") {
        return (
            <Button variant="ghost" className="w-full rounded-full bg-transparent font-[family-name:var(--font-inter-tight)] text-sm font-semibold text-foreground uppercase border border-border h-12">
                Concluído!
            </Button>
        );
    }

    if (sessionState === "IN_PROGRESS") {
        return (
            <Button disabled className="w-full rounded-full bg-foreground font-[family-name:var(--font-inter-tight)] text-sm font-semibold text-background uppercase h-12">
                Treino em Andamento
            </Button>
        );
    }

    return (
        <Button
            onClick={handleStartWorkout}
            disabled={isPending}
            className="w-full rounded-full bg-primary font-[family-name:var(--font-inter-tight)] text-sm font-semibold text-primary-foreground uppercase h-12"
        >
            {isPending ? "Iniciando..." : "Iniciar Treino"}
        </Button>
    );
}
