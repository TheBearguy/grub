import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token,_, jobData) {
    const supabase = supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const {error: storageError} = (await supabase).storage.from("resumes").upload(filename, jobData.resume);
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
