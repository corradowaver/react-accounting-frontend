import React, {Component} from "react";
import DepartmentDataService from "../../service/DepartmentDataService";
import EmployeesComponent from "../employee/Employees";
import ReactLoading from "react-loading";

class ListDepartments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            departments: [],
            message: '',
            loading: false
        }
        this.addDepartmentClicked = this.addDepartmentClicked.bind(this)
        this.deleteDepartmentClicked = this.deleteDepartmentClicked.bind(this)
        this.updateDepartmentClicked = this.updateDepartmentClicked.bind(this)
    }

    componentDidMount() {
        this.refreshDepartments();
    }

    refreshDepartments() {
        this.setState({loading: true})
        DepartmentDataService.retrieveAllDepartments()
            .then(
                response => {
                    this.setState({loading: false})
                    this.setState({departments: response.data})
                }
            )
    }

    deleteDepartmentClicked(id) {
        this.setState({message: ''})
        DepartmentDataService.deleteDepartment(id)
            .then(
                response => {
                    this.refreshDepartments()
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        message: resMessage
                    });
                })
    }

    updateDepartmentClicked(id) {
        this.props.history.push(`/departments/${id}`)
    }

    addDepartmentClicked() {
        this.props.history.push(`/departments/new`)
    }

    render() {
        return (
            <div className="list-container">
                <h3>Departments</h3>
                {this.state.loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div>
                        {this.state.message && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        )}
                        <table className="table">
                            <thead className="table-head">
                            <tr>
                                <th>Name</th>
                                <th>Employees</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.departments.map(
                                    department =>
                                        <tr key={department.id}>
                                            <td><h6>{department.name}</h6></td>
                                            <td><EmployeesComponent id={department.id}/></td>
                                            <td>
                                                <button className="btn btn-outline-light"
                                                        onClick={() => this.updateDepartmentClicked(department.id)}>Update
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-light    "
                                                        onClick={() => this.deleteDepartmentClicked(department.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn  btn-outline-light" onClick={this.addDepartmentClicked}>Add</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ListDepartments
