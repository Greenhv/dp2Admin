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
                title: 'Identificando.',
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
                if (domain.indexOf('8086') >= 0) {
                    setCookie('authToken', data.session.access_token);
                }
                swal({
                    title: 'Identificado',
                    text: 'Te redireccionaremos al dominio escogido',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                });
                setTimeout(() => {
                    if (domain.indexOf('8086') >= 0) {
                        window.location.replace(`${domain}/`);
                    } else {
                        window.location.replace(`${domain}/login?authToken=${data.session.access_token}`);
                    }
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
                swal({
                    type: 'error',
                    title: 'Ocurrio un error en la identificación',
                    text: 'Vuelve a intentarlo en unos segundos',
                });
                this.setState({
                    loading: false,
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
                                    <option value="http://200.16.7.150:8086">Administración</option>
                                    <option value="http://200.16.7.150:8085">Waze</option>
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
