import { useState, ChangeEvent } from "react";
import styles from "./styles.module.css";

import React from "react";

type Props = {
  onAdd: (donation: { id: string; value: number; date: string }) => void;
};

export default function CreateDonation(props: Props) {

  const [donation, setDonation] = useState({
    id: "",
    value: 0,
    date: ""
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDonation((prevDonation) => {
      return {
        ...prevDonation,
        [name]: value
      };
    });
  };

  const submitDonation = async (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onAdd(donation);
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <input name="id" onChange={handleChange} placeholder="id" type="text" />
      <input name="value" onChange={handleChange} placeholder="value" type="number" />
      <input name="date" onChange={handleChange} placeholder="date" type="text" />
      <button onClick={submitDonation}>Create</button>
    </div>
  );
};

