import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// all donations data
const useGetAllDonations = (email) => {
  const {
    isLoading: isPending,
    data: donations = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", email], // Dynamic query key with email
    queryFn: async () => {
      const response = await axios.get(
        `https://blood-donation-server-liard.vercel.app/donations`
      );
      return response.data;
    },
  });

  return { donations, refetch, isPending };
};

export default useGetAllDonations;
