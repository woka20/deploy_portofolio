import React from "react";
import {Provider} from "unistore/react";
import {store} from "../store";
import {Route, Switch, BrowserRouter} from "react-router-dom";

import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import Profile from "../pages/Profile"
import Register from "../pages/Register"
import Admin from "../pages/DashboardAdmin"
import Product from "../pages/ProductsList"
import DashboardAdmin from "../pages/DashboardAdmin"
import Catalog from "../pages/CatalogProduct"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import DashboardHome from "../pages/DashBoardHome"
import DashboardUpdate from "../pages/DashboardUpdate"
import DashboardUserHome from "../pages/DashBoardUserHome"
import DashboardPostUser from "../pages/DashboardPostUser"
import DashboardUpdateUser from "../pages/DashBoardUserUpdate"
import EditProfile from "../pages/editProfile"
import Search from "../pages/searchPages"
import Category from "../pages/Category.js"
import NotMatch from "../pages/notMatch"
import Confirmation from "../pages/paymentConfirmation"
import ProfileAdmin from "../pages/ProfileAdmin"
import AdminUpdateUser from "../pages/adminUpdateUser"
import DashboardEditUser from "../pages/DashboardEditUser"

class MainRoute extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Login" component={SignIn} />
                        <Route exact path="/Profile" component={Profile} />
                        <Route exact path="/Register" component={Register} />
                        <Route exact path="/Admin" component={Admin} />
                        <Route exact path="/AdminCatalog" component={Product} />
                        <Route exact path="/Product" component={Catalog} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route exact path="/DashboardAdmin" component={DashboardAdmin} />
                        <Route exact path="/DashboardHome" component={DashboardHome} />
                        <Route exact path="/DashboardUpdate" component={DashboardUpdate} />
                        <Route exact path="/Dashboard" component={DashboardUserHome} />
                        <Route exact path="/DashboardPostUser" component={DashboardPostUser} />
                        <Route exact path="/DashboardUpdateUser" component={DashboardUpdateUser} />
                        <Route exact path="/editProfile" component={EditProfile} />
                        <Route exact path="/searchPages" component={Search} />
                        <Route exact path="/confirmation" component={Confirmation} />
                        <Route exact path="/ProfileAdmin" component={ProfileAdmin} />
                        <Route exact path="/adminUpdateUser" component={AdminUpdateUser} />
                        <Route exact path="/DashboardEditUser" component={DashboardEditUser} />
                        <Route exact path="/category/:category" component={Category} />
                        <Route component={NotMatch}/>
                        
                        
                        
                    </Switch>
                </BrowserRouter>
            </Provider>)
    }
}

export default MainRoute