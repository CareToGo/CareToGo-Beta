import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore, Hub, syncExpression } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState('no');
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState(null);

  const fetchsub = async () => {
    Auth.currentAuthenticatedUser()
      .then((results)=>{
        setSub(results.attributes.sub)
        setAuthUser(results)
        queryUser(results.attributes.sub);
      })
      .catch((err)=>{console.log(err)})
  }

  const queryUser = async (arg) => {
    const subscription = DataStore.observeQuery(User, (user) => 
    user.sub("eq", arg))
    .subscribe(snapshot => {
      const { items } = snapshot;
      setDbUser(items[0])
    })
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timeId)
    }
  }, []);

  useEffect(() => {
    fetchsub();
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, loading, setDbUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
