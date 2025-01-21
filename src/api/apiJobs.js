import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery}) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved:saved_jobs(id)");
    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }
    const {data, error} = await query;
    if (error) {
        console.error("ERROR FETCHING THE JOBS FROM DB :: ", error);
        return null;
    }
    console.log("DATA FROM CB :: ", data)
    return data;
}


export async function savedJobs({alreadySaved}, saveData) {
    const supabase = await supabaseClient(token);
    if (alreadySaved) {
        let query = supabase.from("saved_jobs").delete().eq("job_id", saveData.job_id)
        const {data, error: deleteError} = await query;
        if (deleteError) {
            console.error("ERROR DELETING THE SAVED JOBS :: ", deleteError);
            return null;
        }
        return data;
    }
    else {
        let query = supabase.from("saved_jobs").insert([saveData]).select();
        const {data, error: insertError} = await query;
        if (insertError) {
            console.error("ERROR INSERTING JOB IN SAVED JOBS :: ", insertError)
        }
        return data;
    }
}
