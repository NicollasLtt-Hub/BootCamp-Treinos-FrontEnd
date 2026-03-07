import { authClient } from "@/app/_lib/auth-client";
import { House, Calendar, Sparkles, ChartNoAxesCombined, UserRound } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface BottomNavProps {
    activeTab?: "home" | "calendar" | "ai" | "stats" | "profile";
}

const BottomNav = async ({ activeTab = "home" }: BottomNavProps) => {
    const session = await authClient.getSession({
        fetchOptions: { headers: await headers() },
    });

    let todayWorkoutUrl = "#";

    if (session.data?.user) {
        const homeResponse = await getHomeData(dayjs().format("YYYY-MM-DD"));
        if (homeResponse.status === 200 && homeResponse.data?.todayWorkoutDay) {
            const workout = homeResponse.data.todayWorkoutDay;
            if (!workout.isRest) {
                todayWorkoutUrl = `/workout-plans/${workout.workoutPlanId}/days/${workout.id}`;
            }
        }
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 rounded-t-[20px] border border-border bg-background px-6 py-4">
            <Link href="/" className="p-3">
                <House className={cn("size-6", activeTab === "home" ? "text-foreground" : "text-muted-foreground")} />
            </Link>

            {todayWorkoutUrl !== "#" ? (
                <Link href={todayWorkoutUrl} className="p-3">
                    <Calendar className={cn("size-6", activeTab === "calendar" ? "text-foreground" : "text-muted-foreground")} />
                </Link>
            ) : (
                <button className="p-3" disabled>
                    <Calendar className="size-6 text-muted-foreground" />
                </button>
            )}

            <button className="rounded-full bg-primary p-4" disabled>
                <Sparkles className="size-6 text-primary-foreground" />
            </button>
            <button className="p-3" disabled>
                <ChartNoAxesCombined className="size-6 text-muted-foreground" />
            </button>
            <button className="p-3" disabled>
                <UserRound className="size-6 text-muted-foreground" />
            </button>
        </nav>
    );
};

export default BottomNav;
