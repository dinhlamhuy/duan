import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
    this.listenToEmiiter();
  }
  listenToEmiiter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
      });
    });
  }

  componentDidMount() {
    // console.log("mouting modal");
  }
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChageInput = (event, id) => {
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState({
      ...copystate,
    });
  };

  checkValidateInput = () => {
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNumber",
      "roleId",
      "gender",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Mising parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
      console.log("check props child ", this.props);
      // console.log(this.state);
    }
  };

  render() {
    // console.log("check child props", this.props);
    // console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"mdlClassName"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create new user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className=" d-inline-flex col-12">
              <div className="col-6 pr-2">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control firstName mb-2"
                  placeholder="firstName"
                  onChange={(event, id) => {
                    this.handleOnChageInput(event, "firstName");
                  }}
                  value={this.state.firstName}
                />
              </div>
              <div className="col-6 pl-2">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control lastName mb-2"
                  placeholder="lastName"
                  onChange={(event, id) => {
                    this.handleOnChageInput(event, "lastName");
                  }}
                  value={this.state.lastName}
                />
              </div>
            </div>
            <label>Email</label>
            <input
              type="email"
              className="form-control email mb-2"
              placeholder="email"
              onChange={(event, id) => {
                this.handleOnChageInput(event, "email");
              }}
              value={this.state.email}
            />

            <label>Password</label>
            <input
              type="password"
              className="form-control password mb-2"
              placeholder="password"
              onChange={(event, id) => {
                this.handleOnChageInput(event, "password");
              }}
              value={this.state.password}
            />

            <label>Address</label>
            <input
              type="text"
              className="form-control address mb-2"
              placeholder="address"
              onChange={(event, id) => {
                this.handleOnChageInput(event, "address");
              }}
              value={this.state.address}
            />

            <label>Phone Number</label>
            <input
              type="text"
              className="form-control phoneNumber mb-2"
              placeholder="phoneNumber"
              onChange={(event, id) => {
                this.handleOnChageInput(event, "phoneNumber");
              }}
              value={this.state.phoneNumber}
            />
            <div className=" d-inline-flex col-12">
              <div className="col-6 pr-2">
                <label>Sex</label>
                <select
                  className="form-control gender mb-2"
                  onChange={(event, id) => {
                    this.handleOnChageInput(event, "gender");
                  }}
                >
                  <option value="">--Select sex for this user--</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div className="col-6 pl-2">
                <label>Role</label>
                <select
                  className="form-control roleId mb-2"
                  onChange={(event, id) => {
                    this.handleOnChageInput(event, "roleId");
                  }}
                >
                  <option value="">--Select role for this user--</option>
                  <option value="R1">Admin</option>
                  <option value="R2">Doctor</option>
                  <option value="R3">Patient</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn px-3"
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add new
          </Button>{" "}
          <Button
            className="btn px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
