import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import Image from "next/image";
import { Calendar, Timer, Dumbbell, CircleHelp, Zap } from "lucide-react";
import BottomNav from "@/components/layout/bottom-nav";
import { BackButton } from "./_components/back-button";
import { WorkoutActions } from "./_components/workout-actions";
import { GetWorkoutDay200SessionsItem } from "@/app/_lib/api/fetch-generated";

const WEEK_DAY_LABELS: Record<string, string> = {
    MONDAY: "SEGUNDA",
    TUESDAY: "TERÇA",
    WEDNESDAY: "QUARTA",
    THURSDAY: "QUINTA",
    FRIDAY: "SEXTA",
    SATURDAY: "SÁBADO",
    SUNDAY: "DOMINGO",
};

const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    return `${minutes}min`;
};

// Determina o estado da sessão
function getSessionState(sessions: GetWorkoutDay200SessionsItem[]): "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" {
    if (!sessions || sessions.length === 0) return "NOT_STARTED";

    // Procura por alguma sessão concluída
    const hasCompleted = sessions.some(s => s.completedAt);
    if (hasCompleted) return "COMPLETED";

    // Procura por alguma em progresso
    const inProgress = sessions.some(s => s.startedAt && !s.completedAt);
    if (inProgress) return "IN_PROGRESS";

    return "NOT_STARTED";
}

export default async function WorkoutDayPage({
    params,
}: {
    params: Promise<{ planId: string; dayId: string }> | { planId: string; dayId: string };
}) {
    // Await params if they are a promise (Next.js 15 app router)
    const resolvedParams = await params;
    const { planId, dayId } = resolvedParams;

    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
        },
    });

    if (!session.data?.user) redirect("/auth");

    const response = await getWorkoutDay(planId, dayId);

    if (response.status === 401) redirect("/auth");
    if (response.status === 404 || response.status === 500) {
        return (
            <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-5 text-center">
                <h1 className="text-xl font-bold text-foreground">Dia de treino não encontrado</h1>
                <BackButton />
            </div>
        );
    }

    const day = response.data;
    const sessionState = getSessionState(day.sessions);

    return (
        <div className="flex min-h-dvh flex-col items-center bg-background pb-28">
            <div className="flex w-full flex-col gap-5 p-5">
                {/* Topbar */}
                <div className="flex w-full items-center justify-between shrink-0">
                    <BackButton />
                    <p className="font-[family-name:var(--font-inter-tight)] text-lg font-semibold capitalize text-foreground">
                        {WEEK_DAY_LABELS[day.weekDay]?.toLowerCase() ?? day.weekDay}
                    </p>
                    <div className="size-10" /> {/* Spacer empty div for centering */}
                </div>

                {/* Banner */}
                <div className="relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5 shrink-0">
                    {day.coverImageUrl ? (
                        <Image
                            src={day.coverImageUrl}
                            alt={day.name}
                            fill
                            className="pointer-events-none object-cover absolute inset-0 rounded-xl"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-muted rounded-xl" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="relative z-10 flex w-full items-center justify-center">
                        <div className="flex items-center justify-center gap-1 rounded-full bg-background/20 px-2.5 py-1.5 backdrop-blur-sm">
                            <Calendar className="size-3.5 text-background" />
                            <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-background">
                                {WEEK_DAY_LABELS[day.weekDay] ?? day.weekDay}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 flex w-full items-end justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="font-[family-name:var(--font-inter-tight)] text-2xl font-semibold leading-[1.05] text-background">
                                {day.name}
                            </p>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center justify-center gap-1">
                                    <Timer className="size-3.5 text-background" />
                                    <span className="font-[family-name:var(--font-inter-tight)] text-xs text-background">
                                        {formatDuration(day.estimatedDurationInSeconds)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                    <Dumbbell className="size-3.5 text-background" />
                                    <span className="font-[family-name:var(--font-inter-tight)] text-xs text-background">
                                        {day.exercises.length} exercícios
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* The Workout Actions button inside the banner if needed, but figma shows it outside in one variation and inside in another? Actually, let's keep it below or inside based on the space. The user task mentions standard button or ghost button. I'll put it below the banner or inside the flex if there's space. Let's put it right after the left details. */}
                    </div>
                </div>

                {/* Actions Button */}
                <div className="w-full shrink-0">
                    <WorkoutActions
                        workoutPlanId={planId}
                        workoutDayId={dayId}
                        sessionState={sessionState}
                    />
                </div>

                {/* Exercises List */}
                <div className="flex w-full flex-col gap-3 shrink-0">
                    {day.exercises.sort((a, b) => a.order - b.order).map((exercise) => (
                        <div key={exercise.id} className="flex min-h-[96px] w-full flex-col gap-3 rounded-xl border border-muted p-5 shrink-0 bg-background">
                            <div className="flex w-full items-center justify-between shrink-0">
                                <p className="font-[family-name:var(--font-inter-tight)] text-base font-semibold text-foreground">
                                    {exercise.name}
                                </p>
                                <button className="size-5 shrink-0" type="button">
                                    <CircleHelp className="size-full text-foreground/50" />
                                </button>
                            </div>
                            <div className="flex shrink-0 items-start gap-1.5">
                                <div className="flex items-center justify-center rounded-full bg-muted px-2.5 py-1.5 shrink-0">
                                    <p className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                                        {exercise.sets} séries
                                    </p>
                                </div>
                                <div className="flex items-center justify-center rounded-full bg-muted px-2.5 py-1.5 shrink-0">
                                    <p className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                                        {exercise.reps} reps
                                    </p>
                                </div>
                                <div className="flex h-[26px] shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-2.5 py-1.5">
                                    <Zap className="size-3.5 text-muted-foreground" />
                                    <p className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                                        {exercise.restTimeInSeconds}s
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav activeTab="calendar" />
        </div>
    );
}
