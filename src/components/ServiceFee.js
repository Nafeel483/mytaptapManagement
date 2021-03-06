
import React, { Component } from 'react';
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import { urlFunction } from '../utils/urls';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll
} from '../utils/userContext';
const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  },
  paperModal: {
    position: 'absolute',
    marginLeft: "33%",
    marginTop: "5%",
    width: '33%',
    height: 540,
    backgroundColor: "#fff",
    border: 'none',
  },
  search1: {
    width: 300,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    elevation: 6,
    '&:hover': {
      backgroundColor: fade('#FFF', 0.8),
    },
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
    },
  },
  TableRowDesign: {
    "&:hover": {
      backgroundColor: "#eee", cursor: "pointer"
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '75ch',
    },
  },
}));
class ServiceFee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      experience: '',
      user: '',
      experience1: "",
      resturantList: [],
      id_restaurant_fk: '',
      fee: '',
      showProgress: false,
      updateValue: false
    }
  }
  componentDidMount = async () => {
    let user = await userContext();
    if (user != null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true,
      })
    } else {
      // back him login
      this.setState({
        isLogin: false
      })
    }
    axios.get(`${urlFunction()}/restaurant/payment/admin/getfee`, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res.data)
      this.setState({
        resturantList: res.data,
      })
      this.setState({
        showProgress: false,
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({
        showProgress: false,
      })
    })
  }
  handleInputChange = (event) => {
    this.setState({ id_restaurant_fk: event.target.value })
  }
  handleInputChangefee = (event) => {
    this.setState({ fee: event.target.value })
  }
  submit = () => {
    let data = {
      id_restaurant_fk: this.state.id_restaurant_fk,
      fee: this.state.fee,
    }
    this.setState({ showProgress: true })
    axios
      .post(`${urlFunction()}/restaurant/payment/admin/addfee`, data, {
        headers: {
          Authorization: 'bearer ' + this.state.user.token,
        },
      })
      .then((res) => {
        console.log("DOne", res)
        // window.location.reload(true);
        alert("Succesfully Added")
        this.setState({ showProgress: false })
        window.location.reload(true);
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  updateResturant = () => {
    let data = {
      id_restaurant_fk: this.state.id_restaurant_fk,
      fee: this.state.fee,
    }
    this.setState({ showProgress: true })
    axios
      .post(`${urlFunction()}/restaurant/payment/admin/updatefee`, data, {
        headers: {
          Authorization: 'bearer ' + this.state.user.token,
        },
      })
      .then((res) => {
        console.log("DOne", res)
        // window.location.reload(true);
        alert("Succesfully Updated")
        this.setState({ showProgress: false })
        window.location.reload(true);
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  updateFee = (value) => {
    console.log("The Value: ", value)
    this.setState({ updateValue: true })
    this.setState({ id_restaurant_fk: value.id_restaurant_fk })
    this.setState({ fee: value.fee })

  }
  render() {
    const { classes } = this.props;
    console.log('my user is', this.state.user)
    return (
      <>
        <TableContainer style={{
          marginTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          width: window.innerWidth - 300,
        }}>
          {this.state.showProgress == true ?
            <LinearProgress />
            : null
          }
          <h1>Add Resturant Fee</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h4>Resturant ID</h4>
                <div className={classes.search1}>
                  <InputBase
                    type="text"
                    name="search"
                    value={this.state.id_restaurant_fk}
                    placeholder="Resturant ID"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput1,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={this.handleInputChange}

                  />

                </div>
              </div>
              <div>
                <h4>Service Fee</h4>
                <div className={classes.search1}>

                  <InputBase
                    type="text"
                    name="search"
                    value={this.state.fee}
                    placeholder="Service Fee"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput1,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={this.handleInputChangefee}

                  />
                </div>
              </div>
              {
                this.state.updateValue != true ?
                  <Button variant="contained" color="primary" style={{ marginTop: '30px' }}
                    onClick={this.submit}
                  >
                    Add
            </Button> :
                  <Button variant="contained" color="primary" style={{ marginTop: '30px' }}
                    onClick={this.updateResturant}
                  >
                    Update
                  </Button>
              }
            </div>
            {/* 
            <FormControlLabel
              label ="FILTER"
                control={
                  <IOSSwitch
                    checked={this.state.checkedB}
                    onChange={this.handleChangeIOS('checkedB')}
                    value="checkedB"
                  />
                }
            /> */}
          </div>
          <div>
            <Table
              component={Paper} aria-label="customized table">

              <TableRow style={{
                backgroundColor: "#fff"
              }}>
                <TableCell> <b>Restaurants Service list</b> </TableCell>
                <TableCell>  </TableCell>
                <TableCell>  </TableCell>
              </TableRow>

              <TableRow style={{
                backgroundColor: "#eeefff"
              }}>
                <TableCell>  Resturant ID </TableCell>
                <TableCell align="left">Service Fee</TableCell>

                <TableCell align="left">Actions</TableCell>


              </TableRow>
              <TableBody>
                {this.state.resturantList.map(resto => (
                  <TableRow className={classes.TableRowDesign}
                  // onClick={this.getRestaurantsDetails.bind(this, resto)}
                  // key={resto.id_restaurant}
                  >
                    <TableCell>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 8,
                          }}>
                          {resto.id_restaurant_fk}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">{`${resto.fee}$`} </TableCell>
                    <TableCell align="left">
                      <Button variant="contained" color="primary"
                        onClick={() => this.updateFee(resto)}
                      >
                        Update
            </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>


            </Table>

          </div>
        </TableContainer>
      </>
    )
  }
};

export default withStyles(styles)(ServiceFee)    