import React, {Component} from 'react';
import ListEmployeesComponent from "./employee/ListEmployees";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import EmployeeForm from "./employee/EmployeeForm";
import ListDepartments from "./department/ListDepartments";
import DepartmentForm from "./department/DepartmentForm";
import SignInForm from "./auth/SignInForm";
import Profile from "./employee/EmployeeProfilePage";
import AuthService from "../service/AuthService";
import ListProjects from "./project/ListProjects";
import ProjectForm from "./project/ProjectForm";
import HomeComponent from "./home/Home";

class AccountingApp extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        let user = AuthService.getCurrentUser();
        user = user === null ? null : user.details;

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.authorities.some(authority => authority.authority === "ROLE_ADMIN")
            });
        }
    }

    logout() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;
        return (
            <Router>
                <div>
                    <nav id="navbar1" className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            AccountingApp
                        </Link>
                        <div className="navbar-nav mr-auto">

                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/employees"} className="nav-link">
                                        Employees
                                    </Link>
                                </li>
                            )}

                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/departments"} className="nav-link">
                                        Departments
                                    </Link>
                                </li>
                            )}

                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/projects"} className="nav-link">
                                        Projects
                                    </Link>
                                </li>
                            )}

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="/signin" className="nav-link" onClick={this.logout}>
                                        Logout
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                            </div>
                        )}
                    </nav>

                    <div className="main-container">
                        <Switch>
                            <Route path="/profile" exact component={Profile}/>
                            <Route path="https://react-accounting-client.herokuapp.com/" exact component={HomeComponent}/>
                            <Route path="/signin" exact component={SignInForm}/>
                            <Route path="/employees" exact component={ListEmployeesComponent}/>
                            <Route path="/employees/:id" component={EmployeeForm}/>
                            <Route path="/departments" exact component={ListDepartments}/>
                            <Route path="/departments/:id" exact component={DepartmentForm}/>
                            <Route path="/projects" exact component={ListProjects}/>
                            <Route path="/projects/:id" exact component={ProjectForm}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default AccountingApp
