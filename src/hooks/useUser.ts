import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });
    return () => cancel();
  }, []);
  return { isLoading, users, error, setUsers, setError };
};
export default useUser;
