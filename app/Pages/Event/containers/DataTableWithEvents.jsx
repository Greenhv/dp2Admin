import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table, Modal } from "react-bootstrap";

import {
  fetchEvents,
  selectEvent,
  deleteEventAction,
  displayImage,
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

  state = {
    modalOpen: false,
  };

  openImgModal = seeImg => () => {
    seeImg();
    this.setState({
      modalOpen: true,
    });
  };

  closeImgModal = () => {
    this.setState({
      modalOpen: false,
    });
  }

  parseEvents = () => {
    const {
      events,
    } = this.props;

    return events.map(myEvent => [
      myEvent.name,
      myEvent.location,
      myEvent.initial_time ? myEvent.initial_time : 'all day',
      myEvent.final_time ? myEvent.final_time : 'all day',
      myEvent.event_date,
      myEvent.banner,
      `${myEvent.id}`,
    ]);
  }

  render() {
    const {
      events,
      isLoadingEvents,
      eventsError,
      removeEvent,
      editEvent,
      seeImg,
      bannerImage,
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
      {
        name: 'Baner',
        options: {
          customRender: (index, value) => (
            <Button onClick={this.openImgModal(seeImg(value))}>
              <em className="fa fa-image"></em>
            </Button>
          ),
        },
      },
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
        <Modal show={this.state.modalOpen} onHide={this.closeImgModal}>
          <Modal.Header closeButton>
            <Modal.Title>Imagen del Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img src={bannerImage} alt="Event Image" style={{ width: '100%' }} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

DataTableWithEvents.defaultProps = {
  bannerImage: '',
};

DataTableWithEvents.propTypes = {
  events: PropTypes.arrayOf(eventType).isRequired,
  isLoadingEvents: PropTypes.bool.isRequired,
  eventsError: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  seeImg: PropTypes.func.isRequired,
  bannerImage: PropTypes.string,
};

const mapStateToProps = ({ events: { events, isLoading, error, bannerImage } }) => ({
  events,
  bannerImage,
  isLoadingEvents: isLoading,
  eventsError: error,
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
  },
  seeImg: img => () => {
    dispatch(displayImage(img));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithEvents
);
