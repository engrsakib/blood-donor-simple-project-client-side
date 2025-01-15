import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllUsers = (user) => {
  const {
    isLoading: isPending, // `isLoading` কে `isPending` নামে পরিবর্তন করা হয়েছে
    data: users = [], // ডিফল্ট ভ্যালু হিসেবে খালি অ্যারে ব্যবহার করা হয়েছে
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email], // কুই-কি তে ইমেইল ব্যবহার করা হয়েছে
    queryFn: async () => {
      if (!user?.email) {
        return []; 
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${user.email}`
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
