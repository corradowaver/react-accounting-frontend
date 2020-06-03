import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import AuthService from "../../service/AuthService";
import * as Yup from "yup";

class SignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            message: "",
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

    }

    onSubmit(values) {
        this.setState({message: ''})
        let user = {
            username: values.username,
            password: values.password
        }
        AuthService.login(user).then(
            () => {
                this.setState({loading: false})
                this.props.history.push("/profile");
                window.location.reload();
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
            }
        );
    }

    signinSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required')
    });

    render() {
        let {message, username, password} = this.state
        return (
            <div className="form">
                <h1>Sign in</h1>
                <div className="signin-form">
                    <Formik
                        initialValues={{username, password}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        validationSchema={this.signinSchema}
                        enableReinitialize={true}>
                        {
                            ({errors}) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>
                                    {errors.username && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.username}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password"/>
                                    </fieldset>
                                    {errors.password && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.password}
                                        </div>)}
                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <button className="btn  btn-outline-light" type="submit">Log in</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default SignInForm
