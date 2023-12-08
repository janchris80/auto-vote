import CircularBrandIcon from 'components/icon/CircularBrandIcon'
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'

const FormSpacer = () => {
  return (
    <div style={{ height: 15, width: '100%' }}></div>
  )
}

const LogoutModal = (props) => {

  const {
    show,
    onHide,
    loading,
    handleLogout = () => { },
  } = props

  const [showLogoutModal] = useState(false)

  const handleClickLogout = () => {
    handleLogout()
  }

  const handleClickHideLogoutModal = () => {
    onHide(false)
  }

  return (
    <React.Fragment>
      {!showLogoutModal && (
        <Modal style={{
          '& div.modalContent': {
            borderRadius: '15px 15px !important',
            border: 'none',
            maxWidth: 400,
            minWidth: 100,
            margin: '0 auto',
          },
          '& input.formControl': {
            borderRadius: '50px 50px',
            fontSize: 14,
          },
          '& label': {
            fontSize: 14,
          },
        }} show={show} onHide={onHide}>
          <ModalBody>
            <React.Fragment>
              <div style={{ width: '98%', margin: '0 auto', top: 10 }}>
                <center>
                  <CircularBrandIcon />
                  <span className={{
                    display: 'flex',
                    fontSize: '1.8em',
                    fontWeight: 800,
                    justifyContent: 'center',
                    margin: '15px 0',
                  }}>Log out of DBuzz?</span>
                </center>
              </div>
              <React.Fragment>
                <div style={{ marginLeft: 10, textAlign: 'left' }}>
                  <React.Fragment>
                    <FormSpacer />
                    <center><h6 className={{ fontFamily: 'Segoe-Bold' }}>You can always log back in at any time.</h6>
                      <br />
                      <br />
                      <Button
                        style={{
                          padding: '5px 15px',
                          display: 'grid',
                          placeItems: 'center',
                          backgroundColor: '#e61c34',
                          color: 'white',
                          borderRadius: '50px 50px',
                          width: 'max-content',
                          border: 'none',
                          outlineWidth: 'none',
                          cursor: 'pointer',
                          '& span': {
                            whiteSpace: 'nowrap',
                            color: 'white',
                            fontFamily: 'Segoe-Bold',
                          },
                          '&:hover': {
                            backgroundColor: '#b71c1c',
                          },
                          '&:disabled': {
                            backgroundColor: '#e61c34',
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          },

                          width: '100%'
                        }}
                        onClick={handleClickLogout}
                      >
                        <span style={{ fontSize: 15 }}>
                          {!loading && 'Log out'}
                          {loading && (<Spinner size={'sm'} />)}
                        </span>
                      </Button>
                      <br />
                      <Button
                        style={{
                          padding: '5px 15px',
                          background: 'transparent',
                          border: '1px solid #e61c34',
                          borderRadius: '50px 50px',
                          color: '#e61c34',
                          width: 'max-content',
                          cursor: 'pointer',
                          '& span': {
                            whiteSpace: 'nowrap',
                            color: '#e61c34',
                            fontWeight: 'bold',
                            fontFamily: 'Segoe-Bold',
                          },
                          '&:hover': {
                            backgroundColor: '#b71c1c1c',
                          },
                          '&:disabled': {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                            background: 'transparent',
                          },
                          width: '100%'
                        }}
                        onClick={handleClickHideLogoutModal} label="Cancel"
                      >
                        <span style={{ fontSize: 15 }}>
                          {!loading && 'Cancel'}
                          {loading && (<Spinner size={'sm'} />)}
                        </span>
                      </Button>
                    </center>
                    <br />
                  </React.Fragment>
                </div>
                <br />
              </React.Fragment>
              <FormSpacer />
            </React.Fragment>
          </ModalBody>
        </Modal>
      )}
    </React.Fragment>
  )
}

// const mapStateToProps = (state) => ({
//   accounts: state.auth.get('accounts'),
//   user: state.auth.get('user'),
// })

// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators({
//     authenticateUserRequest,
//     handleLogout,
//   }, dispatch),
// })

export default LogoutModal