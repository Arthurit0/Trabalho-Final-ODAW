import api from "../../../utils/api";
import confusedCat from "../../../assets/img/confused-cat.png";

import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

import RoundedImage from "../../layout/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petslist_header}>
        <div>
          <h1>Adoções</h1>
          <p>Confira os pets que já estão em processo de adoção com você.</p>
        </div>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${pet.images[0] ? `${process.env.REACT_APP_API}/images/pets/${pet.images[0]}` : confusedCat}`}
                alt={pet.name}
                width="size100px"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Dono:</span> {pet.user.name}
                </p>
                <p>
                  <span className="bold">Telefone:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Email:</span> {pet.user.email}
                </p>
                <p>
                  <span className="bold">Cidade:</span> {pet.user.city}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? <p>Adoção em processo</p> : <p>Parabéns por concluir a adoção</p>}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets adotados!</p>}
      </div>
    </section>
  );
}

export default MyAdoptions;
