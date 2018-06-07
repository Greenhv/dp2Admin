import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  fetchEvents,
  selectEvent,
  deleteEventAction,
  getEvents as requestEvents,
} from 'Modules/events';
import DataTables from 'Shared/DataTable';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { eventType } from '../types';

class DataTableWithEvents extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getEvents
    } = props;

    getEvents();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  parseEvents = () => {
    const {
      events,
    } = this.props;

    return events.map(event => [
      event.name,
      event.location,
      event.initial_time ? event.initial_time : 'all day',
      event.final_time ? event.final_time : 'all day',
      event.event_date,
      event.banner,
      `${event.id}`,
    ]);
  }

  render() {
    const {
      events,
      isLoadingEvents,
      eventsError,
      removeEvent,
      editEvent,
    } = this.props;

    if (eventsError) {
      $.notify(eventsError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Ubicación' },
      { name: 'Inicio' },
      { name: 'Fin' },
      { name: 'Fecha' },
      { name: 'Imagen' },
    ];
    const data = this.parseEvents();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingEvents ? (
          <Loader />
        ) : (
          events.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              // viewAction={selectEvent}
              deleteAction={removeEvent}
              editAction={editEvent}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay eventos para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithEvents.propTypes = {
  events: PropTypes.arrayOf(eventType).isRequired,
  isLoadingEvents: PropTypes.bool.isRequired,
  eventsError: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

const mapStateToProps = ({ events: { events, isLoading, error } }) => ({
  events,
  isLoadingEvents: isLoading,
  eventsError: error
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => {
    dispatch(fetchEvents());
    dispatch(requestEvents());
  },
  editEvent: event => () => {
    dispatch(selectEvent(event));
  },
  removeEvent: event => () => {
    swal({
      title: 'Estas seguro?',
      text: "No se podrá revertir este cambio",
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteEventAction(event));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithEvents
);
