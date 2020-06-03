import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import DepartmentDataService from "../../service/DepartmentDataService";
import * as Yup from 'yup';
import ReactLoading from "react-loading";

class DepartmentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            message: '',
            loading: false
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
        this.setState({loading: true})
        this.setState({message: ''})
        if (this.state.id === "new") {
            console.log(department)
            DepartmentDataService.createDepartment(department)
                .then(() => {
                        this.setState({loading: false})
                        this.props.history.push('/departments')
                    },
                    error => {
                        this.setState({loading: false})
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
                .then(() => {
                        this.setState({loading: false})
                    this.props.history.push('/departments')
                    },
                    error => {
                        this.setState({loading: false})
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
        let {loading, message, id, name} = this.state

        return (
            <div className="form">
                <h3>Department details</h3>
                {loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
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
                                        {message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
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
                )}
            </div>
        )
    }

}

export default DepartmentForm
