import { useEffect, useMemo, useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";
import TextBox from "./TextBox";

const species = {
  Cachorro: ["Labrador", "Pastor Alemão", "Pinstcher", "Não especificado"],
  Gato: ["Siamês", "Persa", "Angorá", "Não especificado"],
  Roedor: ["Hamster", "Twister", "Porquinho-da-Índia", "Não especificado"],
  Pássaro: ["Papagaio", "Canário", "Cacatua", "Não especificado"],
};

function normalizePetData(petData) {
  if (!petData) {
    return {};
  }

  return {
    ...petData,
    images: Array.isArray(petData.images) ? petData.images : [],
    obs: petData.obs || "",
  };
}

function PetForm({ handleSubmit, petData, btnText }) {
  const normalizedPetData = useMemo(() => normalizePetData(petData), [petData]);
  const [pet, setPet] = useState(normalizedPetData);
  const [preview, setPreview] = useState([]);

  const [subspecies, setSubspescies] = useState(
    normalizedPetData.species ? species[normalizedPetData.species] || [] : [],
  );
  const [obsSize, setObsSize] = useState(normalizedPetData.obs.length);

  const previewUrls = useMemo(() => preview.map((image) => URL.createObjectURL(image)), [preview]);

  useEffect(() => {
    setPet(normalizedPetData);
    setSubspescies(normalizedPetData.species ? species[normalizedPetData.species] || [] : []);
    setObsSize(normalizedPetData.obs.length);
  }, [normalizedPetData]);

  function onFileChange(e) {
    console.log(Array.from(e.target.files));
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  const handleObsChange = (e) => {
    setObsSize(e.target.value.length);
    if (e.target.value.length > 500) {
      return;
    }
    setPet({ ...pet, obs: e.target.value });
  };

  function handleSpecies(e) {
    const selectedSpecies = e.target.options[e.target.selectedIndex].text;

    setPet({
      ...pet,
      species: selectedSpecies,
    });

    setSubspescies(species[selectedSpecies]);
  }

  function handleSubspecies(e) {
    setPet({
      ...pet,
      subspecies: e.target.options[e.target.selectedIndex].text,
    });
  }

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? previewUrls.map((url, index) => <img src={url} alt={pet.name} key={index} />)
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
      </div>
      <div>
        <Input
          text="Imagens do Pet"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={true}
        />
        <sub>
          Você pode adicionar mais de uma imagem do pet. Utilize imagens quadradas para melhor
          visualização.
        </sub>
      </div>

      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />

      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />

      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ""}
        handleOnChange={handleChange}
      />

      <Select
        name="especie"
        text="Selecione a espécie"
        options={Object.keys(species)}
        handleOnChange={handleSpecies}
        value={pet.species || ""}
      />

      <Select
        name="subespecie"
        text="Especifique a subespécie"
        options={subspecies}
        handleOnChange={handleSubspecies}
        value={pet.subspecies || ""}
      />

      <TextBox
        name="obs"
        text="Observações do animal"
        placeholder="Adicione informações particulares de cuidado, como temperamento, doenças, alergias, etc."
        handleOnChange={handleObsChange}
        value={pet.obs || ""}
      />
      <sub style={{ color: obsSize > 500 ? "red" : "inherit" }}>{obsSize}/500 caracteres.</sub>

      <input type="submit" value={btnText} />
    </form>
  );
}

export default PetForm;
