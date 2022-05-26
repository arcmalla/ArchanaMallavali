import React, { useState } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";

function SignUp() {
    const [signupDetails, setSignupDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const ValidateEmail = (inputText) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.value.match(mailformat)) {
            toast.warn("valid email")
            document.form1.text1.focus();
            return true;
        }
        else {
            document.form1.text1.focus();
            return false;
        }
    }

    const register = () => { 
        if (signupDetails['firstName'] =="" || signupDetails['lastName']==""  || signupDetails['email']==""  || signupDetails['password'] =="" || signupDetails['confirmPassword']==""  ) {

            toast.warn("please fill all the fields")
        } else { 
            if (signupDetails.password.length >= 6) {

                var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                if (format.test(signupDetails.password)) {
                    if (/\d/.test(signupDetails.password)) {
                        if (/[a-zA-Z]/.test(signupDetails.password)) {

                            if (signupDetails.password == signupDetails.confirmPassword) {

                                var atposition = signupDetails.email.indexOf("@");
                                var dotposition = signupDetails.email.lastIndexOf(".");
                                if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= signupDetails.email.length) {
                                    toast.warn("Please enter a valid e-mail address");
                                } else {
                                    toast.success("all are valid fields")
                                }
                            } else {
                                toast.warn("password and  confirm password should be same ")
                            }


                        } else {
                            toast.warn(" password should contain  minimum 1 character ")

                        }

                    } else {
                        toast.warn("password should contain  minimum 1 number ")

                    }

                } else {
                    toast.warn("password should contain  minimum 1 special character ")

                }
            } else {
                toast.warn("password should be minimum of 6 letters ")

            }


        }
       
    }
    return (
        <div style={{ marginTop: '150px' }}>

            <Container>
                <Row>
                    <Col>
                        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                            Signup
                        </div>
                        <br></br>
                        <div>
                            We do not shate your personal data with anyone
                        </div>

                    </Col>
                    <Col>
                        <>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" value={signupDetails['firstName']} placeholder="First Name" onChange={(e) => {
                                    let details = { ...signupDetails }
                                    details['firstName'] = e.target.value
                                    setSignupDetails(details)

                                }} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Last Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="last Name" value={signupDetails['lastName']} onChange={(e) => {
                                    let details = { ...signupDetails }
                                    details['lastName'] = e.target.value
                                    setSignupDetails(details)

                                }} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" value={signupDetails['email']} onChange={(e) => {
                                    let details = { ...signupDetails }
                                    details['email'] = e.target.value
                                    setSignupDetails(details)


                                }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" value={signupDetails['password']} onChange={(e) => {
                                    let details = { ...signupDetails }
                                    details['password'] = e.target.value
                                    setSignupDetails(details)

                                }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                                <Form.Control type="confirmpassword" value={signupDetails['confirmPassword']} placeholder=" Confirm Password" onChange={(e) => {
                                    let details = { ...signupDetails }
                                    details['confirmPassword'] = e.target.value
                                    setSignupDetails(details)

                                }} />
                            </FloatingLabel>
                            <br></br>
                            <Button variant="danger" size="lg" style={{ width: '100%' }} onClick={register}>
                                Signup
                            </Button>
                        </>

                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default SignUp