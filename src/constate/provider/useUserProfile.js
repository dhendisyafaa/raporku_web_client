import constate from "constate";
import { useMemo, useState } from "react";

const useUserProfile = ({ initialAuthUser = {} }) => {
  const [userData, setUserData] = useState(initialAuthUser);

  const userStateFunction = useMemo(
    () => ({
      setUserData,
    }),
    []
  );

  return { userData, userStateFunction };
};

const [UserDataProvider, useUserStateFunction, useUserData] = constate(
  useUserProfile,
  (value) => value.userStateFunction,
  (value) => value.userData
);

export default UserDataProvider;

export { useUserData, useUserStateFunction };
