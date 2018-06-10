import React from "react";
import { Link, withRouter } from "react-router-dom";
import pubsub from "pubsub-js";
import { Collapse, Button } from "react-bootstrap";
import { eraseCookie } from 'Utils/cookies';
import SidebarRun from "./Sidebar.run";
import pages from "Pages";

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userBlockCollapse: false,
      collapse: {
        products: this.routeActive([
          'productos',
          'marcas',
          'categoria-de-productos',
        ]),
        stores: this.routeActive([
          'tiendas',
          'categoria-de-tiendas',
        ]),
        users: this.routeActive([
          'roles',
          'usuarios',
        ]),
        pages: false
      }
    };
    this.pubsub_token = pubsub.subscribe("toggleUserblock", () => {
      this.setState({
        userBlockCollapse: !this.state.userBlockCollapse
      });
    });
  }

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator.bind(this));
  }

  navigator(route) {
    this.props.history.push(route);
  }

  componentWillUnmount() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    pubsub.unsubscribe(this.pubsub_token);
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    const pathname = this.props.location.pathname;

    if (paths.indexOf(pathname.replace("/", "")) > -1)
      return true;
    return false;
  }

  toggleItemCollapse(stateName) {
    var newCollapseState = {};
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.state.collapse[c] = false;
    }
    console.log(stateName, this.state.collapse);
    this.setState({
      collapse: {
        ...this.state.collapse,
        [stateName]: !this.state.collapse[stateName]
      }
    });
  }

  closeSession = () => {
    eraseCookie('authToken');
    window.location.reload();
  }

  render() {
    return (
      <aside className="aside">
        {/* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            {/* START sidebar nav */}
            <ul className="nav">
              {/* START user info */}
              <li className="has-user-block">
                <Collapse id="user-block" in={this.state.userBlockCollapse}>
                  <div className="user-information-wrapper">
                    <div className="item user-block">
                      {/* User picture */}
                      <div className="user-block-picture">
                        <div className="user-block-status">
                          <img
                            src="https://designdroide.com/images/abstract-user-icon-4.svg"
                            alt="Avatar"
                            width="60"
                            height="60"
                            className="img-thumbnail img-circle"
                          />
                          <div className="circle circle-success circle-lg" />
                        </div>
                      </div>
                      {/* Name and Job */}
                      <div className="user-block-info">
                        <span className="user-block-name">Hola, Gustavo</span>
                        <span className="user-block-role">Administrador</span>
                      </div>
                      <div className="logout-container">
                        <Button onClick={this.closeSession} bsStyle="danger">Cerrar Sesión</Button>
                      </div>
                      <div className="logout-container-mobile">
                        <em className="icon-logout"></em>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </li>
              <li className={ this.routeActive(['productos', 'marcas', 'categoria-de-productos']) ? 'active' : '' }>
                <div className="nav-item" item="Products" onClick={() => { this.toggleItemCollapse('products'); }}>
                  <em className="icon-grid"></em>
                  <span>Productos</span>
                </div>
                <Collapse in={this.state.collapse.products}>
                  <ul className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">Productos</li>
                    <li className={ this.routeActive('productos') ? 'active' : '' }>
                      <Link to="/productos">
                        <span>Productos</span>
                      </Link>
                    </li>
                    <li className={ this.routeActive('marcas') ? 'active' : '' }>
                      <Link to="/marcas">
                        <span>Marcas</span>
                      </Link>
                    </li>
                    <li className={ this.routeActive('categoria-de-productos') ? 'active' : '' }>
                      <Link to="/categoria-de-productos">
                        <span>Categoria de Productos</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li className={ this.routeActive(['tiendas', 'categoria-de-tiendas']) ? 'active' : '' }>
                <div className="nav-item" item="Stores" onClick={() => { this.toggleItemCollapse('stores'); }}>
                  <em className="icon-basket-loaded"></em>
                  <span>Tiendas</span>
                </div>
                <Collapse in={this.state.collapse.stores}>
                  <ul className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">Tiendas</li>
                    <li className={ this.routeActive('tiendas') ? 'active' : '' }>
                      <Link to="/tiendas">
                        <span>Tiendas</span>
                      </Link>
                    </li>
                    <li className={ this.routeActive('categoria-de-tiendas') ? 'active' : '' }>
                      <Link to="/categoria-de-tiendas">
                        <span>Categoria de Tiendas</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li className={ this.routeActive(['usuarios', 'roles']) ? 'active' : '' }>
                <div className="nav-item" item="Users" onClick={() => { this.toggleItemCollapse('users'); }}>
                  <em className="icon-people"></em>
                  <span>Usuarios</span>
                </div>
                <Collapse in={this.state.collapse.users}>
                  <ul className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">Usuarios</li>
                    <li className={ this.routeActive('users') ? 'active' : '' }>
                      <Link to="/tiendas">
                        <span>Usuarios</span>
                      </Link>
                    </li>
                    <li className={ this.routeActive('roles') ? 'active' : '' }>
                      <Link to="/roles">
                        <span>Roles</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li className={this.routeActive(['eventos']) ? 'active' : ''}>
                <Link to="/eventos">
                  <em className="icon-star"></em>
                  <span>Eventos</span>
                </Link>
              </li>
              {/* {pages.map((page, id) => (
                <li key={id} className={this.routeActive(page.path.replace('/', '')) ? 'active' : ''}>
                  <Link to={page.path}>{page.label}</Link>
                </li>
              ))} */}
              {/* END user info */}
              {/* Iterates over all sidebar items */}
              {/* <li className={ this.routeActive(['forum-categories', 'forum-topics', 'forum-discussion']) ? 'active' : '' }>
                                <div className="nav-item" title="Forum" onClick={ this.toggleItemCollapse.bind(this, 'forum') }>
                                    <em className="icon-speech"></em>
                                    <span>Forum</span>
                                </div>
                                <Collapse in={ this.state.collapse.forum }>
                                    <ul id="" className="nav sidebar-subnav">
                                        <li className="sidebar-subnav-header">Forum</li>
                                        <li className={ this.routeActive('forum-categories') ? 'active' : '' }>
                                            <Link to="forum-categories" title="Categories">
                                            <span>Categories</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('forum-topics') ? 'active' : '' }>
                                            <Link to="forum-topics" title="Topics">
                                            <span>Topics</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('forum-discussion') ? 'active' : '' }>
                                            <Link to="forum-discussion" title="Discussion">
                                            <span>Discussion</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li> */}
            </ul>
            {/* END sidebar nav */}
          </nav>
        </div>
        {/* END Sidebar (left) */}
      </aside>
    );
  }
}

export default withRouter(Sidebar);
