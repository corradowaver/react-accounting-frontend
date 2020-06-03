import React, {Component} from "react";
import AuthService from "../../service/AuthService";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import { withRouter } from "react-router-dom";

class EmployeeForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: AuthService.getCurrentUser().details
        }
    }


    render() {
        const user = this.state.currentUser;
        return (
            <div className="form">
                <h1>{user.username} details</h1>
                <div className="formik">
                    <Formik
                        initialValues={{user}}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="user.firstName" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last name</label>
                                        <Field className="form-control" type="text" name="user.lastName" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Father name</label>
                                        <Field className="form-control" type="text" name="user.fatherName" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Position</label>
                                        <Field className="form-control" type="text" name="user.position" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Salary</label>
                                        <Field className="form-control" type="text" name="user.salary" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Department</label>
                                        <Field className="form-control" type="text" name="user.department.name" disabled/>
                                    </fieldset>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }

}

export default withRouter(EmployeeForm)
