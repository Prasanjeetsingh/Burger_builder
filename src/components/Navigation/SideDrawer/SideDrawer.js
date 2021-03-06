import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
const sideDrawer = (props) => {
let attachedClasses = [classes.SideDrawer , props.open ? classes.Open : classes.Close]
  return (
    <Aux >
    <Backdrop show={props.open} click={props.closed}/>
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
    <div className={classes.Logo}>
        <Logo />
    </div>
     <nav>
        <NavigationItems
        isAuthenticated={props.isAuth}
        />
     </nav>
    </div>
    </Aux>
  );
}

export default sideDrawer ;
