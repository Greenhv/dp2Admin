import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const Actions = styled.div`
  display: flex;
`;

const ActionsCells = ({
  viewAction,
  editAction,
  deleteAction,
}) => (
  <Actions>
    { viewAction && (
      <Button onClick={viewAction}>
        <em className="fa fa-eye"></em>
      </Button>
    ) }
    { editAction && (
      <Button onClick={editAction}>
        <em className="fa fa-pencil"></em>
      </Button>
    ) }
    { deleteAction && (
      <Button onClick={deleteAction}>
        <em className="fa fa-remove"></em>
      </Button>
    ) }
  </Actions>
);

ActionsCells.defaultProps = {
  viewAction: null,
  editAction: null,
  deleteAction: null,
}

ActionsCells.propTypes = {
  viewAction: func,
  editAction: func,
  deleteAction: func,
}

export default ActionsCells;
