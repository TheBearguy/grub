import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("companies").select("*")
    const {data, error}  = await query;
    if (error) {
       console.error("ERROR FETCING COMPANIES :: apiCompanies :: ", error);
        return null;
    }
    return data;
}


export async function addNewCompany(token,_, companyData) {
    const supabase = await supabaseClient(token);
    const random = Math.floor( Math.random() * 90000);
    let filename  = `logo-${random}-${companyData.name}`

    const {error: StorageError} = await supabase.storage.from("company-log").upload(filename, companyData.logo);
    if (StorageError) {
        console.error("ERROR WHILE UPLOADING LOGO :: ", StorageError);
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${filename}`;
    let query = supabase.from("companies").insert({
        name: companyData.name,
        logo_url
    }).select();
    const {data, error} = await query;
    if (error) {
        console.error("ERROR WHILE ADDING COMPANY :: ", error)
        return null;
    }
    return data;
}
