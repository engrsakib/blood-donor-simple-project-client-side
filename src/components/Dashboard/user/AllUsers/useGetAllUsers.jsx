import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const {
    isLoading, // লোডিং স্টেট
    data: Allusers = [], // ডেটার ডিফল্ট মান
    refetch, // ডেটা পুনরায় আনতে
    isError, // এরর স্টেট
    error, // এরর ডিটেইল
  } = useQuery({
    queryKey: ["Allusers"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    },
  });

  return { Allusers, refetch, isLoading, isError, error };
};

export default useGetAllUsers;
