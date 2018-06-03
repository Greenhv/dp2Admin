import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, History } from 'react-router-dom';
import { setCookie } from 'Utils/cookies';

class Login extends React.Component {
    state = {
        loading: false,
    }

    submitLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const domain = e.target.domain.value;
        const values = {
            email,
            password,
        };

        if ($(this.form).parsley().isValid()) {
            this.setState({
                loading: true,
            });

            swal({
                title: 'Ingresando...',
                text: 'Espere por favor',
                onOpen: () => {
                    swal.showLoading()
                }
            });

            fetch(`${process.env.API_BASE_URL}/sessions`, {
                method: 'POST',
                body: JSON.stringify(values),
            }).then(response => response.json())
            .then((data) => {
                setCookie('authToken', data.session.access_token);
                window.location.href = `${domain}?authToken=${data.session.access_token}`;
                swal.close();
            })
            .catch((error) => {
                console.log(error);
                swal({
                    type: 'error',
                    title: 'Ocurrio un error en el Login',
                    text: 'Vuelve a intentarlo en unos segundos',
                    timer: 2500,
                });
            })
        }
    }

    render() {
        const {
            loading,
        } = this.state;

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
                        <p className="text-center pv">Inicie sesion para continuar.</p>
                        <form
                          role="form"
                          data-parsley-validate=""
                          noValidate className="mb-lg"
                          ref={node => { this.form = node; }}
                          onSubmit={this.submitLogin}
                        >
                            <div className="form-group has-feedback">
                                <input name="email" type="email" placeholder="Ingrese su cuenta de email" autoComplete="off" required="required" className="form-control" />
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input name="password" type="password" placeholder="Contraseña" required="required" className="form-control" />
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <select name="domain" className="form-control" placeholder="Dominio" required="required">
                                    <option value="http://administracion.com">Administración</option>
                                    <option value="http://waze.com">Waze</option>
                                    <option value="http://smartTV.com">SmartTV</option>
                                </select>
                            </div>
                            <div className="clearfix">
                                <div className="pull-right">
                                    <Link to="recover" className="text-muted">Olvidaste tu contraseña?</Link>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-block btn-primary mt-lg" disabled={loading}>
                                { loading ? 'Cargando...' : 'Ingresar' }
                            </button>
                        </form>
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Login;
