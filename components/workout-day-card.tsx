import { Timer, Dumbbell, Calendar } from "lucide-react";
import Image from "next/image";

interface WorkoutDayCardProps {
    name: string;
    weekDay: string;
    estimatedDurationInSeconds: number;
    exercisesCount: number;
    coverImageUrl?: string | null;
}

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

const WorkoutDayCard = ({
    name,
    weekDay,
    estimatedDurationInSeconds,
    exercisesCount,
    coverImageUrl,
}: WorkoutDayCardProps) => {
    return (
        <div className="relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5">
            {coverImageUrl && (
                <Image
                    src={coverImageUrl}
                    alt={name}
                    fill
                    className="pointer-events-none object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

            <div className="relative z-10 flex items-center justify-center">
                <div className="flex items-center justify-center gap-1 rounded-full bg-background/15 px-2.5 py-1.5 backdrop-blur-sm">
                    <Calendar className="size-3.5 text-background" />
                    <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-background">
                        {WEEK_DAY_LABELS[weekDay] ?? weekDay}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex w-full flex-col gap-2">
                <p className="font-[family-name:var(--font-inter-tight)] text-2xl font-semibold leading-[1.05] text-background">
                    {name}
                </p>
                <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center gap-1">
                        <Timer className="size-3.5 text-background/70" />
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs text-background/70">
                            {formatDuration(estimatedDurationInSeconds)}
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <Dumbbell className="size-3.5 text-background/70" />
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs text-background/70">
                            {exercisesCount} exercícios
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDayCard;
