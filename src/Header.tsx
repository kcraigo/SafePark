import * as React from "react";
import { LeftNavPanel } from "./components/leftNav/leftNav";
import { Switch, Route } from "react-router";

import Contacts from "./components/views/contacts/contacts";
import Home from "./components/views/home/home";
import MyDashboard from "./components/views/myDashboard/myDashboard";
import { Policies } from "./components/views/policies/policies";
import ParkingRequestForm from "./components/views/requestForm/requestForm";
import appUser  from "./utility/user";
import { useEffect } from "react";

let currentUser ='';
export const Header = () => {

    useEffect(() => {
        appUser().then(res => {
            currentUser = res;
        });
        return () => {
            console.log("Header");
        };
    }, [])


  return (
    <div id="app-container" className="ms-Grid grid" dir="ltr">
      <div className="Logo">
        <div id="banner-row">
          <div id="banner">
            <div id="appTitle">
              <a href="#">SAFEPARK</a>
            </div>
            <div id="userInfo">
              <strong>{currentUser}</strong>
            </div>
          </div>
        </div>
        <div id="content-body-row">
          <div id="content-body" className="content-body ms-Grid">
            <LeftNavPanel />

            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/policies" component={Policies} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/myDashboard" component={MyDashboard} />
              <Route path="/requestForm" component={ParkingRequestForm} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );


};
