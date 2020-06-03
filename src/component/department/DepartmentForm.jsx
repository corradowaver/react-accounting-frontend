import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import DepartmentDataService from "../../service/DepartmentDataService";
import * as Yup from 'yup';

class DepartmentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "new") {

        } else {
            DepartmentDataService.retrieveDepartment(this.state.id)
                .then(response => this.setState({
                    name: response.data.name,
                }))
        }
    }

    onSubmit(values) {
        let department = {name: values.name}
        this.state.mesage = ''
        if (this.state.id === "new") {
            console.log(department)
            DepartmentDataService.createDepartment(department)
                .then(() => this.props.history.push('/departments'),
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
        } else {
            DepartmentDataService.updateDepartment(this.state.id, department)
                .then(() => this.props.history.push('/departments'),
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
    }

    departmentSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
    });

    render() {
        let {id, name} = this.state

        return (
            <div className="form">
                <h3>Department details</h3>
                <div className="formik">
                    <Formik
                        initialValues={{id, name}}
                        onSubmit={this.onSubmit}
                        validationSchema={this.departmentSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}>
                        {
                            ({errors}) => (
                                <Form>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    {errors.name && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.name}
                                        </div>)}
                                    <button className="btn btn-outline-light" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default DepartmentForm