import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  fetchBrands,
  selectBrand,
  deleteBrandAction,
  getBrands as requestBrands
} from "Modules/brands";
import DataTables from "Shared/DataTable";
import DataTaleEmptyMsg from "Shared/DataTableEmptyMsg.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { brandType } from "../types";

class DataTableWithBrands extends PureComponent {
  constructor(props) {
    super(props);

    const { getBrands } = props;

    getBrands();
  }

  state = {
    modalOpen: false,
  };

  openImgModal = () => {
    console.log("Modal!");
  };

  parseBrands = () => {
    const { brands } = this.props;
    return brands.map(brand => [
      brand.name,
      brand.description ? brand.description: '-',
      brand.corporation_name ? brand.corporation_name: '-',
      `${brand.id}`,
    ]);
  };

  render() {
    const {
      brands,
      isLoadingBrands,
      brandsError,
      removeBrand,
      editBrand
    } = this.props;

    if (brandsError) {
      $.notify(brandsError, "danger");
    }

    const headers = [
      { name: "Nombre" },
      { name: "Descripcion" },
      { name: "Corporacion" },
    ];

    const data = this.parseBrands();
    const options = {
      selectableRows: false
    };

    return (
      <div>
        {isLoadingBrands ? (
          <Loader />
        ) : (brands.length > 0 ? (
          <DataTables
            headers={headers}
            data={data}
            options={options}
            deleteAction={removeBrand}
            editAction={editBrand}
          />
        ) : (
          <Table responsive striped hover>
            <tbody>
              <DataTaleEmptyMsg colSpan={6}>
                No hay marcas para mostrar
              </DataTaleEmptyMsg>
            </tbody>
          </Table>  
        )
        )}
      </div>
    );
  }
}

DataTableWithBrands.propTypes = {
  brands: PropTypes.arrayOf(brandType).isRequired,
  isLoadingBrands: PropTypes.bool.isRequired,
  brandsError: PropTypes.string.isRequired,
  getBrands: PropTypes.func.isRequired,
  editBrand: PropTypes.func.isRequired,
  removeBrand: PropTypes.func.isRequired,
};

const mapStateToProps = ({ brands: { brands, isLoading, error } }) => ({
  brands,
  isLoadingBrands: isLoading,
  brandsError: error
});

const mapDispatchToProps = dispatch => ({
  getBrands: () => {
    dispatch(fetchBrands());
    dispatch(requestBrands());
  },
  editBrand: brand => () => {
    dispatch(selectBrand(brand));
  },
  removeBrand: brand => () => {
    swal({
      title: "Estas seguro?",
      text: "No se podrá revertir este cambio",
      type: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo borrarlo",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        dispatch(deleteBrandAction(brand));
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableWithBrands);
