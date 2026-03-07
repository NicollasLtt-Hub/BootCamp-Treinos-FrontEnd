import { CircleHelp, Zap } from "lucide-react";

interface ExerciseCardProps {
    name: string;
    sets: number;
    reps: number;
    restTimeInSeconds: number;
}

const ExerciseCard = ({
    name,
    sets,
    reps,
    restTimeInSeconds,
}: ExerciseCardProps) => {
    return (
        <div className="flex h-24 w-full items-start justify-between rounded-xl border border-border p-5">
            <div className="flex flex-1 flex-col items-start justify-center gap-3 self-stretch">
                <div className="flex w-full items-center justify-between">
                    <p className="font-[family-name:var(--font-inter-tight)] text-base font-semibold text-foreground">
                        {name}
                    </p>
                    <CircleHelp className="size-5 text-muted-foreground" />
                </div>
                <div className="flex items-start gap-1.5">
                    <div className="flex items-center justify-center rounded-full bg-muted px-2.5 py-1">
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                            {sets} séries
                        </span>
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-muted px-2.5 py-1">
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                            {reps} reps
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 rounded-full bg-muted px-2.5 py-1">
                        <Zap className="size-3.5 text-muted-foreground" />
                        <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase text-muted-foreground">
                            {restTimeInSeconds}S
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;
