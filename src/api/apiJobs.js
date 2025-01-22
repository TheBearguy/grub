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


export async function savedJobs(token, {alreadySaved}, saveData) {
    // console.log("From the savedJobs api cb *****************************************************************");
    // console.log(saveData);

    const supabase = await supabaseClient(token);
    if (alreadySaved) {
        let query = supabase.from("saved_jobs").delete().eq("job_id", saveData.job_id)
        const {data, error: deleteError} = await query;
        // console.log("DATA WHEN JOB IS ALREADY SAVED :: ", data);

        if (deleteError) {
            console.error("ERROR DELETING THE SAVED JOBS :: ", deleteError);
            return null;
        }
        return data;
    }
    else {
        let query = supabase.from("saved_jobs").insert([saveData]).select();
        const {data, error: insertError} = await query;
        // console.log("DATA WHEN JOB IS NOT ALREADY SAVED",data);

        if (insertError) {
            console.error("ERROR INSERTING JOB IN SAVED JOBS :: ", insertError)
        }
        return data;
    }
}


export async function getSingleJob(token, {job_id}) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), applications:applications(*)").eq("id", job_id);
    const {data, error}  =  await query

    if (error) {
        console.error("ERROR FETCHING company for single job", error);
        return null;
    }
    // console.log(data[0]);

    return data[0];
}


export async function updateHiringStatus(token, {job_id}, isOpen) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").update({isOpen}).eq("id", job_id).select();
    const {data, error} = await query;

    if (error) {
        console.errror("ERROR UPDATING THE HIRING STATUS :: ", error);
        return null;
    }
    return data;
}
