import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BtnP = styled.p.attrs({
  className: 'btn no-border'
})`
`;

const ButtonItem = ({ title, btnClick, icon }) => {
  return (
    <BtnP
      onClick={ btnClick }
    >
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{ title }</span>      
    </BtnP>
  )
}

export default ButtonItem;