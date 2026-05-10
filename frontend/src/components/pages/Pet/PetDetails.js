import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./PetDetails.module.css";

import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImage from "../../layout/RoundedImage";

import confusedCat from "../../../assets/img/confused-cat.png";

function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(
        `pets/schedule/${pet._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>{pet.name}</h1>
            <p>Se tiver interesse, clique no botão verde e entre em contato com o dono!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.length > 0 ? (
              pet.images.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                />
              ))
            ) : (
              <img src={confusedCat} alt="Confused Cat" />
            )}
          </div>
          <div className={styles.pet_details_p_container}>
            <div className={styles.pet_details_content}>
              {" "}
              <p className={styles.pet_details_list_heading}>
                <span className="bold">Informações do pet {pet.name}:</span>
              </p>
              <p>
                <span className="bold">Espécie:</span> {pet.species}
              </p>
              <p>
                <span className="bold">Subespécie:</span> {pet.subspecies}
              </p>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              <p>
                <span className="bold">Idade:</span> {pet.age} anos
              </p>
              {pet.obs && (
                <p>
                  <span className="bold">Observações sobre o pet:</span> {pet.obs}
                </p>
              )}
              <p className={styles.pet_details_list_heading}>
                <span className="bold">Informações sobre o dono:</span>
              </p>
              {pet.user?.image && (
                <div className={styles.owner_image}>
                  <RoundedImage
                    src={`${process.env.REACT_APP_API}/images/users/${pet.user.image}`}
                    alt={pet.user.name}
                    width="size120px"
                  />
                </div>
              )}
              <p>
                <span className="bold">Nome:</span> {pet.user.name}
              </p>
              <p>
                <span className="bold">E-mail:</span> {pet.user.email}
              </p>
              <p>
                <span className="bold">Telefone:</span> {pet.user.phone}
              </p>
              <p>
                <span className="bold">Cidade:</span> {pet.user.city}
              </p>
            </div>

            <div className={styles.pet_details_actions}>
              {token ? (
                <button onClick={schedule}>Solicitar uma Visita</button>
              ) : (
                <p className={styles.login_notice}>
                  Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PetDetails;
