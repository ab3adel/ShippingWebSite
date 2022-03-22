import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { withRouter, useHistory } from 'react-router-dom';
import Homepage from '../HomePage'
import Homepage2 from '../HomePage2'
import Homepage3 from '../HomePage3'
import Aboutpage from '../AboutPage'
import ServiceSingle from '../ServiceSingle'
import AirFreight from '../AirFreight'
import RoadFreight from '../RoadFreight'
import OceanFreight from '../OceanFreight'
import PricingPage from '../PricingPage'
import TeamPage from '../TeamPage'
import ContactPage from '../ContactPage'
import BlogPageSidebar from '../BlogPageSidebar'
import BlogPageFullwidth from '../BlogPageFullwidth'
import BlogSingleSidebar from '../BlogSingleSidebar'
import BlogDetailsFullwidth from '../BlogDetailsFullwidth'
import FAQs from '../FAQs'
import Login from '../Login'
import Signup from '../Signup'
import Navbar from '../../components/Navbar'
import Profile from '../Profile'
// import Recipient from '../Recipient'
// import Recipients from '../Recipients'
import ShippingRequest from '../ShippingRequestPage/ndex'
const Recipients = React.lazy(() => import('../Recipients'));
const Recipient = React.lazy(() => import('../Recipient'));
const Bills = React.lazy(() => import('../Bills'));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
      <i className="fa fa-spinner fa-spin" ></i>
    </div>
  </div>
)


function ScrollToTop() {
  let history = useHistory()
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}


const AllRoute = () => {

  return (
    <div className="App">
      <React.Suspense fallback={loading}>

        <Router>
          <ScrollToTop />
          <Navbar />
          <Switch>


            <Route exact path='/' component={Homepage2} />
            <Route path='/home' component={Homepage} />
            <Route path='/home2' component={Homepage} />
            <Route path='/home3' component={Homepage3} />
            <Route path='/about' component={Aboutpage} />
            <Route path='/servicesingle' component={ServiceSingle} />
            <Route path='/freight' component={AirFreight} />
            <Route path='/road' component={RoadFreight} />
            <Route path='/ocean' component={OceanFreight} />
            <Route path='/pricing' component={PricingPage} />
            <Route path='/team' component={TeamPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/blog' component={BlogPageSidebar} />
            <Route path='/blog-fullwidth' component={BlogPageFullwidth} />
            <Route path='/blog-single' component={BlogSingleSidebar} />
            <Route path='/blog-single-fullwidth' component={BlogDetailsFullwidth} />
            <Route path='/FAQs' component={FAQs} />
            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Signup} />
            <Route path='/Profile' component={Profile} />

            <Route path='/Recipients' component={Recipients} />
            <Route path='/Recipient/:id' component={Recipient} />
            <Route path='/Bills' component={Bills} />

            <Route Path='/shippingrequest' component={ShippingRequest} />

          </Switch>

        </Router>
      </React.Suspense>
    </div>
  );
}

export default AllRoute;
