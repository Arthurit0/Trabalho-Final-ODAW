import { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'
import TextBox from './TextBox'

function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const species = { 'Cachorro': ['Labrador', 'Pastor Alemão', 'Pinstcher', 'Não especificado'], 'Gato': ['Siamês', 'Persa', 'Angorá', 'Não especificado'], 'Roedor': ['Hamster', 'Twister', 'Porquinho-da-Índia', 'Não especificado'], 'Pássaro': ['Papagaio', 'Canário', 'Cacatua', 'Não especificado'] }
  const [subspecies, setSubspescies] = useState(petData ? species[petData.species] : [])

  function onFileChange(e) {
    console.log(Array.from(e.target.files))
    setPreview(Array.from(e.target.files))
    setPet({ ...pet, images: [...e.target.files] })
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  function handleSpecies(e) {
    const selectedSpecies = e.target.options[e.target.selectedIndex].text;

    setPet({
      ...pet,
      species: selectedSpecies
    })

    setSubspescies(species[selectedSpecies]);
  }

  function handleSubspecies(e) {
    setPet({
      ...pet,
      subspecies: e.target.options[e.target.selectedIndex].text,
    })
  }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(pet)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
            <img
              src={URL.createObjectURL(image)}
              alt={pet.name}
              key={`${pet.name}+${index}`}
            />
          ))
          : pet.images &&
          pet.images.map((image, index) => (
            <img
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={pet.name}
              key={`${pet.name}+${index}`}
            />
          ))}
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ''}
      />

      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ''}
      />

      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ''}
        handleOnChange={handleChange}
      />

      <Select
        name="especie"
        text="Selecione a espécie"
        options={Object.keys(species)}
        handleOnChange={handleSpecies}
        value={pet.species || ''}
      />

      <Select
        name="subespecie"
        text="Especifique a subespécie"
        options={subspecies}
        handleOnChange={handleSubspecies}
        value={pet.subspecies || ''}
      />

      <TextBox
        name="obs"
        text="Observações do animal"
        placeholder="Adicione informações particulares de cuidado, como temperamento, doenças, alergias, etc."
        handleOnChange={handleChange}
        value={pet.obs || ''}
      />

      {/* <Select
        name="color"
        text="Selecione a categoria"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ''}
      /> */}


      <input type="submit" value={btnText} />
    </form>
  )
}

export default PetForm
