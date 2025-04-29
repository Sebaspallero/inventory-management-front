import { getActivityLogs } from "@/services/ActivityLogService"
import { IActivityLog } from "@/types/IActivityLog"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const useActivityLogs = () => {
    return useQuery<IActivityLog[]>({
        queryKey: ["activity-logs"],
        queryFn: () => getActivityLogs(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        placeholderData: keepPreviousData,
    })
}
