import React from 'react';
import { number, element } from 'prop-types';
import styled from 'styled-components';

const EmptyMsg = styled.td`
  text-align: center;
  color: #989ca280;
`;

const DataTableEmptyMsg = ({ colSpan, children }) => (
  <tr>
    <EmptyMsg colSpan={colSpan}>
      { children }
    </EmptyMsg>
  </tr>
);

DataTableEmptyMsg.propTypes = {
  colSpan: number,
  children: element,
}

export default DataTableEmptyMsg;
