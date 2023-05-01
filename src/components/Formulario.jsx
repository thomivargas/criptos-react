import React from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const InputSubmit = styled.input`
    width: 100%;
    border: none;
    padding: 10px;
    background-color:#9497FF;
    text-transform: uppercase;
    color: white;
    font-size: 20px;
    font-weight:700;
    border-radius: 10px;
    margin-top:30px;
    transition: background-color .3s ease;

    &:hover {
        background-color:#7a7dfe;
        cursor: pointer;
    }
`


const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos); 

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()     

      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        }
        return objeto;
      })

      setCriptos(arrayCriptos)
    }
    consultarAPI();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([moneda, criptomoneda].includes('')) {
      setError(true);
      return;
    } 

      setError(false)
      setMonedas({moneda, criptomoneda});
  }


  return (
    <>
      {error && 
        <Mensaje>Todos los campos son obligatorios</Mensaje>
      }
      <form
      onSubmit={handleSubmit}
      >
      
      <SelectMonedas/>
      <SelectCriptomoneda/>

      <InputSubmit 
        type="submit" 
        value="cotizar"
      />
    </form>
    </> 
  )
}

export default Formulario
