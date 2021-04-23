import { useState } from "react";

export default function useForm(initial = {}) {
  // create a state object for our object
  const [ inputs, setInputs ] = useState(initial);

  function handleChange(e) {
    const { value, name, type} = e.target
    if(name === 'price') {
      const newValue = parseInt(value)
      setInputs({
        ...inputs,
        [name]: newValue,
      })
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      })
    }
    
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']))
    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  }
}