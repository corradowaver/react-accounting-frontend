import React, {Component} from "react";
import EmployeeDataService from "../../service/EmployeeDataService";
import DepartmentDataService from "../../service/DepartmentDataService";
import { withRouter } from "react-router-dom";

class EmployeesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            employees: [],
            message: ''
        }
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this)
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this)
    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {

        if (this.state.id === "all") {
            EmployeeDataService.retrieveAllEmployees()
                .then(
                    response => {
                        this.setState({employees: response.data})
                    }
                )
        } else {
            DepartmentDataService.retrieveDepartment(this.state.id)
                .then(
                    response => {
                        this.setState({employees: response.data.employees})
                    }
                )
        }
    }

    deleteEmployeeClicked(id) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({message: `Deletion of employee with id ${id} Successful`})
                    this.refreshEmployees()
                }
            )
    }

    updateEmployeeClicked(id) {
        this.props.history.push(`/employees/${id}`)
    }


    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead className="table-head">
                    <tr>
                        <th>Name</th>
                        <th>Last name</th>
                        <th>Father name</th>
                        <th>Position</th>
                        <th>Salary</th>
                        {this.state.id === "all" && (<th>Department</th>)}
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.employees
                            .filter(employee => employee.authorities.some(authority => authority.authority === "ROLE_EMPLOYEE"))
                            .map(
                            employee =>
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.fatherName}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.salary}💲</td>
                                    {this.state.id === "all" && (<td>{employee.department == null ? "-" : employee.department.name}</td>)}
                                    <td>
                                        <button className="btn btn-outline-light"
                                                onClick={() => this.updateEmployeeClicked(employee.id)}>Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-light"
                                                onClick={() => this.deleteEmployeeClicked(employee.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default withRouter(EmployeesComponent)
