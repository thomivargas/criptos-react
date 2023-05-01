import styled from '@emotion/styled'
import React from 'react'

const Texto = styled.div`
    background-color: #B7322C;
    color: #FFF;
    font-size: 22px;
    padding: 15px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weit: 700;
    text-align: center;

`

const Mensaje = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Mensaje
