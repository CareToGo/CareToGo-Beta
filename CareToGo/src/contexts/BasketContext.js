import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Worker, Order } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [worker, setWorker] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [total, setTotal] = useState(0);

  const queryWorkers = async () => {
    const subscription = DataStore.observeQuery(Worker).subscribe(
      (snapshot) => {
        const { items } = snapshot;
        setWorker(null);
        setWorkers(items);
        // console.log(items)
      }
    );
  };

  useEffect(() => {
    queryWorkers();
  }, []);

  const createOrder = async (services, total, worker) => {
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Worker: worker,
        status: "NEW",
        name: dbUser.firstname,
        address: dbUser.address,
        lat: dbUser.lat,
        lng: dbUser.lng,
        total: total,
        service: JSON.stringify(services),
      })
    );
  };

  return (
    <BasketContext.Provider value={{ createOrder, setWorker, workers }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
