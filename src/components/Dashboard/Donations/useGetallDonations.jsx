import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllDonations = (email) => {
  const {
    isLoading: isPending,
    data: donations = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", email], // Dynamic query key with email
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donations`
      );
      return response.data;
    },
  });

  return { donations, refetch, isPending };
};

export default useGetAllDonations;
