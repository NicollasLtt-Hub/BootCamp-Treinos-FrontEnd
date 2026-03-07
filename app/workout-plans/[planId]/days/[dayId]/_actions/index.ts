"use server";

import { startWorkoutSession } from "@/app/_lib/api/fetch-generated";
import { revalidatePath } from "next/cache";

export async function startWorkoutSessionAction(planId: string, dayId: string) {
    const response = await startWorkoutSession(planId, dayId);
    revalidatePath(`/workout-plans/${planId}/days/${dayId}`);
    return response;
}
