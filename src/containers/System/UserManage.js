import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  //check
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {}
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    })
  }

  createNewUser = async (data) => {
    try {

      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
      console.log("res create user: ", response)
    } catch (error) {
      console.log(error)

    }
  }

  getAllUserFromReact = async () => {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  handleEditUser = async (data) => {
    console.log('edit user with iD: ', data);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: data
    })
  }
  doEditUser = async (user) => {
    console.log('Click save user', user);
    try {
      let response = await editUserService(user);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        })
        await this.getAllUserFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleDeleteUser = async (id) => {
    // console.log('delete user with iD: ', id);
    try {
      let response = await deleteUserService(id);
      if (response && response.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(response.errMessage);
      }

    } catch (error) {
      console.log(error);
    }
  }
  /** life cycle (vong doi)
   * run component:
   * 1. run construct ->init state
   * 2. did mount(set state)
   * 3. render (re-rend)
   */
  render() {
    let listUser = this.state.arrUsers;
    // console.log("check render ", listUser);
    return (
      <>
        <div className="user-container">
          <ModalUser
            isOpen={this.state.isOpenModalUser} test={'a,b,c'}
            toggleFromParent={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenModalEditUser &&
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              toggleFromParent={this.toggleUserEditModal}
              currentUser={this.state.userEdit}
              editUser={this.doEditUser}

            />
          }
          <div className="title text-center">Manage users</div>
          <div className="mx-1">
            <button
              onClick={() => this.handleAddNewUser()}
              className="px-3 mb-3 btn btn-primary"
            >
              <i className="fas fa-plus"></i> Add New User
            </button>
          </div>
          <div className="users-table">
            <table id="customers">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listUser &&
                  listUser.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName + " " + item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            onClick={() => {
                              this.handleEditUser(item)
                            }}
                            className="btn  btn-edit px-2">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            onClick={() => {
                              this.handleDeleteUser(item.id)
                            }}
                            className="btn btn-delete px-2">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
