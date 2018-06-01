import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Recover extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if ($(this.form).parsley().isValid()) {
           swal({
               type: 'success',
               title: 'Tu mensaje se envio correctamente',
               timer: 1500,
           });
           setTimeout(() => {
               this.props.history.push('/login');
           }, 2000);
        }
    }

    render() {
        return (
            <div className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <a href="#">
                            <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                        </a>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">Recuperar contraseña</p>
                        <form role="form" ref={(node) => { this.form = node; }} onSubmit={this.onSubmit}>
                            <p className="text-center">Completa el siguiente campo con tu email</p>
                            <div className="form-group has-feedback">
                                <label htmlFor="resetInputEmail1" className="text-muted">Correo</label>
                                <input name="email" type="email" placeholder="example@example.com" autoComplete="off" className="form-control" required />
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <button type="submit" className="btn btn-danger btn-block">Reset</button>
                        </form>
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Recover;

