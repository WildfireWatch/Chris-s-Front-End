import React, { useEffect, useState } from "react";
import axios from "axios";

import Domain from "../Domain";
import Area from "../Area";
import Menu from "../../UI/Menu";
import Navbar from "../../UI/Navbar";
import ErrorAlert from "../../UI/ErrorAlert";

import LoadingOverlay from "react-loading-overlay";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { useAuth } from "../../../context/auth";
import { Redirect } from "react-router";

import { SERVER_ADDRESS } from "../../../constants/constants";

const AddQuestionToBank = (props) => {
    const [QuestionText, setQuestionText] = useState("");
    const [correct, setCorrect] = useState("");
    const [distractor1, setDistractor1] = useState("");
    const [distractor2, setDistractor2] = useState("");
    const [distractor3, setDistractor3] = useState("");
    const { authToken } = useAuth();
    const [submitForm, setSubmitForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [teaser, setTeaser] = useState();
    const [teaserValid, setTeaserValid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          setOverlayActive(true);
          const data = new FormData();
    
          data.append("questionText", QuestionText);
          data.append("correct", correct);
          data.append("distractor1", distractor1);
          data.append("distractor2", distractor2);
          data.append("distractor3", distractor3);
          data.append("userId", localStorage.getItem("userId"));
    
          await axios
            .post(SERVER_ADDRESS + "save-questionbank", data, {
              headers: {
                Authorization: "Bearer " + authToken,
              },
            })
            .then((response) => {
              if (response.status !== 200) {
                event.preventDefault();
                event.stopPropagation();
              }
              setOverlayActive(false);
              setSubmitForm(true);
            })
            .catch((err) => {
              setOverlayActive(false);
              if (err.response.status === 500) {
                setDisplayErrorAlert(true);
                setAlertMessage("The questionbank with BankName already exist!");
              } else alert(err);
              console.log(err);
            });
        }

      };

      const distractor1Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor1(event.target.value);
      }

      const distractor2Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor2(event.target.value);
      }
      
      const teaserHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setTeaser(event.target.value);
      };

      const distractor3Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor3(event.target.value);
      }


      const correctHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setCorrect(event.target.value);
      }

      const questionTextHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setQuestionText(event.target.value);
      };

      return (
        <LoadingOverlay
          active={isOverlayActive}
          spinner
          text="Uploading your content..."
        >
          <div style={{ height: 100 + "%" }}>
            <Container
              className="wrappedContainer"
              fluid
              style={{ height: 100 + "%" }}
            >
              
              <Navbar />
    
              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Row className="justify-content-md-center">
                  <ErrorAlert
                    showAlert={displayErrorAlert}
                    AlertMessage={alertMessage}
                  ></ErrorAlert>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                   as={Col}
                   sm={4}
                   controlId="validationCustom01"
                   className="required"
                  >
                  <Form.Label>Question Text</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      key="topicNameInputKey"
                      onBlur={questionTextHandler}
                    />
                    
                  </Form.Group>
    
                  <Form.Group
                    as={Col}
                    sm={4}
                    controlId="validationCustom01"
                    className="required"
                  >
                    <Form.Label>correct answer</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      key="topicNameInputKey"
                      onBlur={correctHandler}
                    />
                  </Form.Group>
                      
                  <Form.Group 
                    as={Col} 
                    sm={4}
                    controlId="validationCustom01"
                    className="required">
                  <Form.Label>distractor1</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      key="topicNameInputKey"
                      onBlur={distractor1Handler}
                    />
                  </Form.Group>
                </Form.Row>
                
    
                <Row>
                  <Col sm={12}>
                    <Form.Group className="required">
                      <Form.Label>
                        Teaser paragraph
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="paragraphTooltip">
                              Please enter 1-2 sentences about your Question Bank
                            </Tooltip>
                          }
                        >
                          <Button variant="secondary" className="circle-tooltip">
                            ?
                          </Button>
                        </OverlayTrigger>
                      </Form.Label>
                      <Form.Control
                        className={teaserValid ? "is-valid" : "is-invalid"}
                        as="textarea"
                        rows={10}
                        required
                        onBlur={teaserHandler}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col sm={12} className="asterix-caption">
                    indicates required fields
                  </Col>
                </Row>
                <Row>&nbsp;</Row>
                <Form.Row className="justify-content-md-right">
                  <Form.Group as={Col} sm={10} className="float-right">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="float-right"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Container>
          </div>
        </LoadingOverlay>
      );
    };
    
    export default AddQuestionToBank;
    
