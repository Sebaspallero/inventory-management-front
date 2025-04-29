import { getAllPaginatedUsers, getUsersStats, searchUserByName, exportUsersToExcel, deleteUser, updateUser } from "@/services/userService";
import { IPagedResponse } from "@/types/IPagedResponse";
import { IUserResponse, IUsersStats, IUserUpdateRequest } from "@/types/IUser";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useUsersStats = () => {
    return useQuery<IUsersStats>({
        queryKey: ["usersStats"],
        queryFn: () => getUsersStats(),
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
    })
}

export const useFilteredUsers = (page: number, size: number, search: string) => {
    const trimmedSearch = search.trim();
    const shouldSearch = trimmedSearch.length > 2;
  
    const queryKey = ['users', { page, size, search: trimmedSearch }];
  
    const queryFn = () => {
      if (shouldSearch) {
        return searchUserByName(trimmedSearch, page, size);
      }
      return getAllPaginatedUsers(page, size);
    };
  
    return useQuery<IPagedResponse<IUserResponse>>({
      queryKey,
      queryFn,
      refetchOnWindowFocus: false,
      refetchInterval: 60000,
      placeholderData: keepPreviousData,
      staleTime: 300000,
    });
  };

  export const useUpdateUser = () => {
      const queryClient = useQueryClient();
  
      return useMutation({
          mutationFn: ({ id, user }: { id: number; user: IUserUpdateRequest }) => updateUser(id, user),
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['users'] });
          },
      });
  };

  export const useDeeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

  export const useExportUsers= () => {
    return useMutation({
        mutationFn: exportUsersToExcel,
    });
};