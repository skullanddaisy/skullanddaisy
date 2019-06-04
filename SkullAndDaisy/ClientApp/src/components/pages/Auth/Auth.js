import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Container,
  } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import Register from '../Register/Register.js';

import './Auth.scss';

class Auth extends React.Component {
    state = {
        user: {
            email: '',
            password: '',
        },
    };

    loginClickEvent = (e) => {
        const { user } = this.state;
        e.preventDefault();
        authRequests
            .loginUser(user)
            .then(() => {
            this.props.history.push('/home');
        })
        .catch(error => {
            console.error('there was an error in registering', error);
        });
    };
    
    emailChange = e => {
        const tempUser = { ...this.state.user };
        tempUser.email = e.target.value;
        this.setState({ user: tempUser });
    };
    
    passwordChange = e => {
        const tempUser = { ...this.state.user };
        tempUser.password = e.target.value;
        this.setState({ user: tempUser });
    };

    render () {
        const { user } = this.state;
        return (
            <Container className="Login">
                <Row>
                    <Col><h1 className="text-center">Skull And Daisy</h1></Col>
                </Row>
                <div id="login-form">
                <Form>
                    <FormGroup className="form-group">
                    <Label htmlFor="inputEmail" className="col-sm-4 control-label">
                        Email:
                    </Label>
                        <Input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        value={user.email}
                        onChange={this.emailChange}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                    <Label htmlFor="inputPassword" className="col-sm-4 control-label">
                        Password:
                    </Label>
                        <Input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        value={user.password}
                        onChange={this.passwordChange}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                    <div className="col-sm-12">
                        <Button
                        type="submit"
                        className="btn btn-default col-xs-12"
                        onClick={this.loginClickEvent}
                        >
                        Login
                        </Button>
                    </div>
                    </FormGroup>
                </Form>
                </div>
                <Register />
            </Container>
        );
    }
}

export default Auth;