import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContract from "./components/SingleContract";
import { Contract } from "./models/contract";

function App() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    loadContracts();
  }, []);

  const updateContract = async (contract: Contract) => {
    console.log("contract", contract);
    const result = await axios.put(
      "https://challengetask.herokuapp.com/contracts/" + contract.id,
      contract
    );
    console.log(result);
  };

  const loadContracts = async () => {
    const json = await axios.get(
      "https://challengetask.herokuapp.com/contracts"
    );
    setContracts(json.data?.contracts);
  };
  return (
    <div className="App">
      <header className="header">
        <h1>Acme Contracts</h1>
      </header>
      <section className="contracts">
        {!!contracts && contracts.length > 0 ? (
          contracts.map((contract: Contract, index: number) => (
            <SingleContract
              key={index}
              details={contract}
              update={updateContract}
            />
          ))
        ) : (
          <p>No Contracts found!</p>
        )}
      </section>
    </div>
  );
}

export default App;
