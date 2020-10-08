import React from 'react';

import Wrapper from './Wrapper';

function LeftMenuFooter() {
  const projectType = PROJECT_TYPE;

  return (
    <Wrapper>
      <div className="poweredBy">
        <a key="website" href="https://reactavancado.com.br" target="_blank" rel="noopener noreferrer">
          React Avançado
        </a>
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
