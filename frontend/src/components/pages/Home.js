import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import dogSleep from "../../assets/img/dog-sleep.png";
import confusedCat from "../../assets/img/confused-cat.png";

import styles from "./Home.module.css";

function Home() {
  const [pets, setPets] = useState([]);
  const availablePets = pets.filter((pet) => pet.available);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section className={styles.home_section}>
      <div className={styles.pet_home_header}>
        <div>
          <h1>Adote um Pet</h1>
          <p>
            Explore os pets cadastrados, compare perfis e encontre um novo companheiro com
            facilidade.
          </p>
        </div>
        <div className={styles.pet_home_badge}>
          {availablePets.length > 0
            ? `${availablePets.length === 1 ? "1 pet" : `${availablePets.length} pets`} esperando por você!`
            : "Novos pets em breve!"}
        </div>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              {pet.images[0] ? (
                <div
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                  }}
                  className={styles.pet_card_image}
                ></div>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${confusedCat})`,
                  }}
                  className={styles.pet_card_image}
                ></div>
              )}
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Espécie:</span> {pet.species}
              </p>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              <p>
                <span className="bold">Idade:</span> {pet.age} anos
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
            </div>
          ))}
      </div>
      {pets.length === 0 && (
        <div className={styles.empty_state}>
          <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
          <img src={dogSleep} alt="Cachorro dormindo" />
        </div>
      )}
    </section>
  );
}

export default Home;
