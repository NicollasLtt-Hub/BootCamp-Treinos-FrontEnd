import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getHomeData } from "./_lib/api/fetch-generated";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import WorkoutDayCard from "@/components/workout-day-card";
import WeeklyConsistency from "@/components/weekly-consistency";
import BottomNav from "@/components/layout/bottom-nav";
import { Flame } from "lucide-react";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const homeResponse = await getHomeData(dayjs().format("YYYY-MM-DD"));

  if (homeResponse.status === 401) redirect("/auth");

  const homeData = homeResponse.status === 200 ? homeResponse.data : null;
  const todayWorkout = homeData?.todayWorkoutDay;
  const userName = session.data.user.name?.split(" ")[0] ?? "Atleta";

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="relative flex h-[296px] w-full flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5">
        <Image
          src="/home-banner.png"
          alt="Banner"
          fill
          className="pointer-events-none object-cover"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-b-[20px]"
          style={{
            backgroundImage:
              "linear-gradient(242deg, rgba(0,0,0,0) 34%, rgb(0,0,0) 100%)",
          }}
        />

        <p className="relative z-10 font-[family-name:var(--font-anton)] text-[22px] uppercase leading-[1.15] text-background">
          Fit.ai
        </p>

        <div className="relative z-10 flex w-full items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="font-[family-name:var(--font-inter-tight)] text-2xl font-semibold leading-[1.05] text-background">
              Olá, {userName}
            </p>
            <p className="font-[family-name:var(--font-inter-tight)] text-sm text-background/70">
              Bora treinar hoje?
            </p>
          </div>
          <div className="rounded-full bg-primary px-4 py-2">
            <span className="font-[family-name:var(--font-inter-tight)] text-sm font-semibold text-background">
              Bora!
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-28 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-lg font-semibold text-foreground">
            Consistência
          </h2>
          <button className="font-[family-name:var(--font-inter-tight)] text-xs text-primary">
            Ver histórico
          </button>
        </div>

        <div className="flex items-stretch gap-3">
          <div className="flex-1 rounded-xl border border-border p-5">
            <WeeklyConsistency
              consistencyByDay={homeData?.consistencyByDay ?? {}}
              todayKey={
                ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][dayjs().day()]
              }
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-streak px-5 py-2">
            <Flame className="size-5 text-streak-foreground" />
            <span className="font-[family-name:var(--font-inter-tight)] text-base font-semibold text-foreground">
              {homeData?.workoutStreak ?? 0}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-lg font-semibold text-foreground">
            Treino de Hoje
          </h2>
          <button className="font-[family-name:var(--font-inter-tight)] text-xs text-primary">
            Ver treinos
          </button>
        </div>

        {todayWorkout && !todayWorkout.isRest ? (
          <Link href="#">
            <WorkoutDayCard
              name={todayWorkout.name}
              weekDay={todayWorkout.weekDay}
              estimatedDurationInSeconds={todayWorkout.estimatedDurationInSeconds}
              exercisesCount={todayWorkout.exercisesCount}
              coverImageUrl={todayWorkout.coverImageUrl}
            />
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border p-10">
            <p className="text-center font-[family-name:var(--font-inter-tight)] text-lg font-semibold text-foreground">
              Dia de descanso 🎉
            </p>
            <p className="text-center font-[family-name:var(--font-inter-tight)] text-sm text-muted-foreground">
              Aproveite para descansar e se recuperar.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
