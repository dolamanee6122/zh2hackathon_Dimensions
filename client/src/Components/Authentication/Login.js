import { Button,FormHelperText,Select,InputLabel,MenuItem,Slide, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import {ReactComponent as Svg} from "../../assets/login_logo.svg";
import "./Login.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin:'4px',
  }
}));

const Login = () => {
    const classes = useStyles();
    const transitionDuration = 500;
    const handleClick=(e)=>{
        e.preventDefault();
        setElementIn(false);
        setTimeout(()=>{
            setElementIn(true);
            if(active==="login") setActive("register");
            else setActive("login");
        },transitionDuration);
       
    }
    const [elementIn,setElementIn]=useState(true);
    const [active,setActive] =useState("login");
    const types=["MERCHANT", "CONSUMER"];
    const [selectedType,setSelectedType]=useState(types[0]);
    const handleTypeChange=(e)=>{
        e.preventDefault();
        setSelectedType(e.target.value);
    }
    return (
        <div style={{display:"flex", height:"95vh" ,alignItems:"center", justifyContent:"space-evenly"}}>
            <div >
            <Svg style={{height:"50%",transform: "scale(0.5)"}}/>
            </div>
            <div style={{display:"flex", backgroundColor:"#6C63FF", height:"100%",flex:1, alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
            
            <Slide
                in={elementIn}
                timeout={transitionDuration}
                direction="left"
            >
                <div>
                    {active==="login"  && 
                    <div>
                        <div className="auth-header">
                        LOGIN
                        </div>
                        <Paper component="form" className={classes.root}>
                        <AlternateEmailIcon/>
                            <TextField
                                label="Email"
                                className={classes.input}
                                placeholder="Email"
                                fullWidth
                            />
                        </Paper>
                        <Paper component="form" className={classes.root}>
                        <VpnKeyIcon/>

                            <TextField
                                label="Password"
                                type="password"
                                className={classes.input}
                                fullWidth
                                placeholder="Password"
                            />
                        </Paper>
                        <div style={{display:"flex"}}>
                        <Button variant="contained" color="secondary">Submit</Button>
                        <Button onClick={handleClick}>{active==="login"?"REGISTER":"LOGIN"}</Button>
                        </div>
                    </div>}
                    {active==="register"  && 
                    <div>
                        <div className="auth-header">
                        REGISTER
                        </div>
                        <Paper component="form" className={classes.root}>
                        <AlternateEmailIcon/>
                            <TextField
                                label="Email"
                                className={classes.input}
                                placeholder="Email"
                                fullWidth
                            />
                        </Paper>
                        <Paper component="form" className={classes.root}>
                             <VpnKeyIcon/>
                            <TextField
                                label="Password"
                                type="password"
                                className={classes.input}
                                placeholder="Password"
                                fullWidth
                            />
                        </Paper>
                        <Paper component="form" className={classes.root} >
                            <TextField
                                select
                                label="Account Type"
                                value={selectedType}
                                onChange={handleTypeChange}
                                fullWidth
                                helperText="Select account that suits you"
                            >
                            { types.map((e)=>{
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })
                            }
                            </TextField>
                        </Paper>
                        <div style={{display:"flex"}}>
                        <Button variant="contained" color="secondary">Submit</Button>
                        <Button onClick={handleClick} >{active==="login"?"REGISTER":"LOGIN"}</Button>
                        </div>
                    </div>}
                </div>
            </Slide>
                
            </div>
        </div>
    )
}

export default Login;
