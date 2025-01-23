import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllUsers = (user) => {
  const {
    isLoading: isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      try {
        const response = await axios.get(
          `https://blood-donation-server-liard.vercel.app/users/${user?.email}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  });

  return { users, refetch, isPending };
};

export default useGetAllUsers;
