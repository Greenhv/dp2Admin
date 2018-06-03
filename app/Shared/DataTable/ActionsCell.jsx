import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Actions = styled.div`
  display: flex;
`;

const ActionsCells = ({
  id,
  viewAction,
  editAction,
  deleteAction,
}) => (
  <Actions>
    { viewAction && (
      <Button onClick={viewAction(parseInt(id))}>
        <em className="fa fa-eye"></em>
      </Button>
    ) }
    { editAction && (
      <Link to={`${window.location.pathname}/editar/${id}`}>
        <Button onClick={editAction(parseInt(id))}>
          <em className="fa fa-pencil"></em>
        </Button>
      </Link>
    ) }
    { deleteAction && (
      <Button onClick={deleteAction(parseInt(id))}>
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
  id: string.isRequired,
  viewAction: func,
  editAction: func,
  deleteAction: func,
}

export default ActionsCells;
