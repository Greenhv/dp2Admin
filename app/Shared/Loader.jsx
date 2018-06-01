import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  height: 50px;
  margin: 0 auto;
  width: 50px;
  transform: translateY(25px);
`;

const Loader = () => (
  <StyledLoader>
    <div className="ball-clip-rotate-pulse">
        <div></div>
        <div></div>
    </div>
  </StyledLoader>
);

export default Loader;