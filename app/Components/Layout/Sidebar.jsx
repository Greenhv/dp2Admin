import React from "react";
import { Link, withRouter } from "react-router-dom";
import pubsub from "pubsub-js";
import { Collapse } from "react-bootstrap";
import SidebarRun from "./Sidebar.run";
import pages from "Pages";

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userBlockCollapse: false,
      collapse: {
        dashboard: this.routeActive([
          "dashboard",
          "dashboardv2",
          "dashboardv3"
        ]),
        widget: this.routeActive("widgets"),
        elements: this.routeActive([
          "buttons",
          "notifications",
          "sweetalert",
          "tour",
          "carousel",
          "spinners",
          "animations",
          "dropdown",
          "nestable",
          "sortable",
          "panels",
          "portlet",
          "grid",
          "grid-masonry",
          "typography",
          "icons-font",
          "icons-weather",
          "colors"
        ]),
        forms: this.routeActive([
          "form-standard",
          "form-extended",
          "form-validation",
          "form-wizard",
          "form-upload",
          "form-xeditable",
          "form-cropper"
        ]),
        charts: this.routeActive([
          "chart-flot",
          "chart-radial",
          "chart-chartjs",
          "chart-rickshaw",
          "chart-morris",
          "chart-chartist"
        ]),
        tables: this.routeActive([
          "table-standard",
          "table-extended",
          "table-datatable",
          "table-jqgrid"
        ]),
        maps: this.routeActive(["map-google", "map-vector"]),
        extras: this.routeActive([
          "mailbox",
          "timeline",
          "calendar",
          "invoice",
          "search",
          "todo",
          "profile",
          "bug-tracker",
          "contact-details",
          "contacts",
          "faq",
          "file-manager",
          "followers",
          "help-center",
          "plans",
          "project-details",
          "projects",
          "settings",
          "social-board",
          "team-viewer",
          "vote-links"
        ]),
        blog: this.routeActive([
          "blog-list",
          "blog-post",
          "blog-articles",
          "blog-article-view"
        ]),
        ecommerce: this.routeActive([
          "ecommerce-orders",
          "ecommerce-order-view",
          "ecommerce-products",
          "ecommerce-product-view",
          "ecommerce-checkout"
        ]),
        forum: this.routeActive([
          "forum-categories",
          "forum-topics",
          "forum-discussion"
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
    if (paths.indexOf(this.props.location.pathname.replace("/", "")) > -1)
      return true;
    return false;
  }

  toggleItemCollapse(stateName) {
    var newCollapseState = {};
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.state.collapse[c] = false;
    }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName]
      }
    });
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
                  <div>
                    <div className="item user-block">
                      {/* User picture */}
                      <div className="user-block-picture">
                        <div className="user-block-status">
                          <img
                            src="img/user/02.jpg"
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
                        <span className="user-block-name">Hello, Mike</span>
                        <span className="user-block-role">Designer</span>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </li>
              {pages.map(page => (
                <li className={this.routeActive(page.path)}>
                  <Link to={page.path}>{page.label}</Link>
                </li>
              ))}
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
