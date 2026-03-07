import { cn } from "@/lib/utils";

interface ConsistencyDay {
    workoutDayCompleted: boolean;
    workoutDayStarted: boolean;
}

interface WeeklyConsistencyProps {
    consistencyByDay: Record<string, ConsistencyDay>;
    todayKey?: string;
}

const DAY_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];
const DAY_KEYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

const WeeklyConsistency = ({ consistencyByDay, todayKey }: WeeklyConsistencyProps) => {
    return (
        <div className="flex items-center justify-between">
            {DAY_KEYS.map((dayKey, index) => {
                const day = consistencyByDay[dayKey];
                const isCompleted = day?.workoutDayCompleted ?? false;
                const isStarted = day?.workoutDayStarted ?? false;
                const isToday = dayKey === todayKey;

                return (
                    <div
                        key={dayKey}
                        className="flex flex-col items-center gap-1.5"
                    >
                        <div
                            className={cn(
                                "size-5 rounded-md",
                                isCompleted && "bg-primary",
                                !isCompleted && isStarted && "bg-primary/30",
                                !isCompleted && !isStarted && isToday && "border-[1.6px] border-primary",
                                !isCompleted && !isStarted && !isToday && "border border-border"
                            )}
                        />
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs leading-[1.4] text-muted-foreground">
                            {DAY_LABELS[index]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default WeeklyConsistency;
