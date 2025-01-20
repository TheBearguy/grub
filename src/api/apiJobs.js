import supabaseClient from "@/utils/supabase";

export async function getJobs(token) {
    const supabase = await supabaseClient(token)

    const {data, error} = await supabase.from("jobs").select("*");
    if (error) {
        console.error("ERROR FETCHING THE JOBS FROM DB :: ", error);
        return null;
    }
    return data;
}
