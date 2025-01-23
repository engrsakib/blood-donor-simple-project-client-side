import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetTaka = () => {
  const {
    isLoading: isPending,
    data: TK = [],
    refetch,
  } = useQuery({
    queryKey: ["all-funds-TK"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://blood-donation-server-liard.vercel.app/users/add-fund/all/tk`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  });

  return { TK, refetch, isPending };
};

export default useGetTaka;
