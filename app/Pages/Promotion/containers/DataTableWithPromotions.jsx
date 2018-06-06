import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  fetchPromotions,
  selectPromotion,
  deletePromotionAction,
  getPromotions as requestPromotions,
} from 'Modules/promotions';
import DataTables from 'Shared/DataTable';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { promotionType } from '../types';

class DataTableWithPromotions extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getPromotions
    } = props;

    getPromotions();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  parsePromotions = () => {
    const {
      promotions,
    } = this.props;

    return promotions.map(promotion => [
      promotion.only_mobile,
      promotion.value,
      promotion.initial_date,
      promotion.final_date,
      promotion.store_id,
      `${promotion.id}`,
    ]);
  }

  render() {
    const {
      promotions,
      isLoadingPromotions,
      promotionsError,
      removePromotion,
      editPromotion,
    } = this.props;

    if (promotionsError) {
      $.notify(promotionsError, "danger");
    }

    const headers = [
      { name: 'Solo mobil' },
      { name: 'Fecha inicial' },
      { name: 'Fecha final' },
      { name: 'Valor del descuento' },
      { name: 'Tienda' },
    ];
    const data = this.parsePromotions();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingPromotions ? (
          <Loader />
        ) : (
          promotions.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              // viewAction={selectProduct}
              deleteAction={removePromotion}
              editAction={editPromotion}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay promociones para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithPromotions.propTypes = {
  promotions: PropTypes.arrayOf(promotionType).isRequired,
  isLoadingPromotions: PropTypes.bool.isRequired,
  promotionsError: PropTypes.string.isRequired,
  getPromotions: PropTypes.func.isRequired,
  editPromotion: PropTypes.func.isRequired,
  removePromotion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ promotions: { promotions, isLoading, error } }) => ({
  promotions,
  isLoadingPromotions: isLoading,
  promotionsError: error
});

const mapDispatchToProps = dispatch => ({
  getPromotions: () => {
    dispatch(fetchPromotions());
    dispatch(requestPromotions());
  },
  editPromotion: promotion => () => {
    dispatch(selectPromotion(promotion));
  },
  removePromotion: promotion => () => {
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
        dispatch(deletePromotionAction(promotion));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithPromotions
);
