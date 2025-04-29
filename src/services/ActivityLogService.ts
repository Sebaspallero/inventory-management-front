import API from "@/lib/axios";


export const getActivityLogs = async () => {
    const response = await API.get("activities/recent");
    return response.data;
}