import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token,_, jobData) {
    const supabase = await supabaseClient(token);
    console.log("FATHER",supabase)
    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(filename, jobData.resume);

    if (storageError) {
        console.error("ERROR UPLOADING RESUME :: ", storageError);

    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${filename}`;

    let query = supabase.from("applications").insert([
        {
            ...jobData,
            resume
        }
    ])
    const {data, error} = await query;
    if (error) {
        console.error("ERROR SUBMITTING APPLICATION :: ", error);
        return null;
    }
    return data;
}

export async function updateApplicationStatus(token, {job_id}, status) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("applications").update({status}).eq("job_id", job_id).select()
    const {data, error} = await query;
    if (error || data.length === 0) {
        console.error("ERROR UPDATING APPLICATION STATUS :: ", error)
        return null;
    }
}
