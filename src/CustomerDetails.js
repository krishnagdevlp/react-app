import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }
  
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }
  
  getCustomerDetails(id) {
    axios.get('assets/samplejson/customer' + id + '.json').then(response => {
      let totalRewards = 0;
      response.data.trans.map(transaction=> {
        let points = 0;
        let over100 = transaction.amt - 100;
        
        if (over100 > 0) {             
          points += (over100 * 2);
        }    
        if (transaction.amt > 50) {          
          points += 50;      
        }
        transaction.rewards = points;
        totalRewards = totalRewards + points;
      });
      this.setState({totalRewards: totalRewards})

      this.setState({customerDetails: response})
            
      
    })
  };  

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Rewards History</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p>Name : {this.state.customerDetails.data.name}</p>                    
          
          <p>
          {this.state.customerDetails.data.trans.map(home => <div>{home.transactionDt} :  {home.rewards} </div> )}
          </p>
          <p>Total Rewards : {this.state.totalRewards} </p>
          <div> </div>
        </Panel.Body>
      </Panel>
    </div>)
  }
}
