import React,{Component} from "react";
import {Route,Switch,routerRedux,withRouter }from "dva/router";
import PropTypes from "prop-types";
import _ from "lodash";
import Member from "./routes/Member";
import ClassList from "./routes/class.js";
import Home from "./routes/Home";
import Detect from "./routes/Detect";
import Login from "./routes/Login";
import Record from "./routes/Record";
import Dashboard from "./routes/Dashboard";

const{ConnectedRouter}=routerRedux;

class Root extends Component{
  static propTypes={
    app:PropTypes.object.isRequired,
    history:PropTypes.object.isRequired,
  };
  render(){
    const {children}=this.props;
    return children;
  }
}
const RouterRoot=withRouter(_.flow()(Root))

const router =(props)=>{
  return(
    <ConnectedRouter {...props}>
      <RouterRoot  {...props}>
        <Switch>
          <Route path="/Member" exact component={Member}/>
          <Route path="/ClassList" exact component={ClassList} />
          <Route path="/" exact component={Home} />
          <Route path="/Detect" exact component={Detect}/>
          <Route path="/Login" exact component={Login}/>
          <Route path="/Record" exact component={Record}/>
          <Route path="/Dashboard" exact component={Dashboard}/>
        </Switch>
      </RouterRoot>
    </ConnectedRouter>
  )
}

export default router;
