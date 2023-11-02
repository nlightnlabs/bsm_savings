import React, {useState, useEffect} from 'react'

function App() {

  const logo = "https://nlightnlabs01.s3.us-west-1.amazonaws.com/icons/nlightn+labs+logo.png"

  const logoStyle = {
    maxHeight: 300,
    maxWidth: 300,
    display: "block",
    margin: "auto"
  }

  const [revenue, setRevenue] = useState(1000000000);
  const [industry, setIndustry] = useState("Financial Services");
  const [addressableSpend, setAddressableSpend] = useState(0);
  const [currentPOSpend, setCurrentPOSpend] = useState(50);
  const [currentNegotiatedSpend, setCurrentNegotiatedSpend] = useState(30);
  const [numberOfSuppliers, setNumberOfSuppliers] = useState(7000);
  const [numberOfNewSuppliers, setNumberOfNewSuppliers] = useState(700);
  const [numberOfOrders, setNumberOfOrders] = useState(40000);
  const [numberOfInvoices, setNumberOfInvoices] = useState(80000);
  const [numberOfPayments, setNumberOfPayments] = useState(40000);
  
  const [savingsFromControl, setSavingsFromControl] = useState(0);
  const [savingsFromNegotiations, setSavingsFromNegotiations] = useState(0);
  const [poEfficiencySavings, setPOEfficiencySavings] = useState(0);
  const [invoiceEfficiencySavings, setInvoiceEfficiencySavings] = useState(0);
  const [supplierEfficiencySavings, setSupplierEfficiencySavings] = useState(0);
  const [supplierOnboardingEfficiencySavings, setSupplierOnboardingEfficiencySavings] = useState(0);
  const [paymentEfficiencySavings, setPaymentEfficiencySavings] = useState(0);
  const [savingsFromEfficiency, setSavingsFromEfficiency] = useState(0);
  const [WorkingCapitalImpact, setWorkingCaptalImpact] = useState(0);
  const [savings, setSavings] = useState(0);


  const industryList = [
    {name: "Financial Services", addressableSpendPct: 0.25},
    {name: "Healthcare", addressableSpendPct: 0.2},
    {name: "Manufacturing", addressableSpendPct: 0.1},
    {name: "Retail", addressableSpendPct: 0.1},
    {name: "Energy", addressableSpendPct: 0.1},
    {name: "Software", addressableSpendPct: 0.25},
    {name: "Automotive", addressableSpendPct: 0.15},
    {name: "Hospital", addressableSpendPct: 0.25},
    {name: "Government", addressableSpendPct: 0.3}
  ]

  const estimateSavings=()=>{
    let addressableSpendPct = industryList.filter(x=>x.name===industry)[0].addressableSpendPct;
    console.log(addressableSpendPct);
    setAddressableSpend(addressableSpendPct*revenue);
    setSavingsFromControl(Math.round((Math.ceil(95-currentPOSpend,0))/100*addressableSpend*0.05),2)
    setSavingsFromNegotiations(Math.round((Math.ceil(95-currentNegotiatedSpend,0))/100*addressableSpend*0.20),2)
    setPOEfficiencySavings(12*numberOfOrders);
    setInvoiceEfficiencySavings(3*numberOfInvoices);
    setSupplierEfficiencySavings(40*numberOfSuppliers);
    setSupplierOnboardingEfficiencySavings(((900-740)*numberOfNewSuppliers))
    setPaymentEfficiencySavings(3*numberOfPayments);
    setSavingsFromEfficiency(poEfficiencySavings+invoiceEfficiencySavings+supplierEfficiencySavings+supplierOnboardingEfficiencySavings+paymentEfficiencySavings)
    setWorkingCaptalImpact(addressableSpend/365*0.1/365*15);
    setSavings(savingsFromNegotiations+savingsFromNegotiations+savingsFromEfficiency+WorkingCapitalImpact)
  }

  let USD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    digits: 2
});

  useEffect(()=>{

    estimateSavings();

  },[revenue,industry,currentPOSpend,currentNegotiatedSpend])


  return (
    <div className="App">
      <div className="container-flex">
      <div className="row mb-5">
            <img style={logoStyle} src={logo}/>
        </div>

      <div className="row">
        
        <h4 className="text-center">{`Business Spend Management`}</h4>
        <h1 className="text-center mb-5">{`Savings Estimator`}</h1>
        
        <div className="col-3"></div>

        <div className="col-6 text-left">

          <div className="row">
          
          <div className="col-6 text-left">

          <h4>Spend Profile</h4>
            <div className="form-group mb-3">
              <label>Annual Revenue</label>
              <input 
                className="form-control"
                type="number" 
                onBlur={(e)=>setRevenue(e.target.value)}
                placeholder="Annual Revenue"
              ></input>
            </div>

              <div className="form-group mb-3">
                <label>Industry</label>
                <select className="form-control w-100" onChange={(e=>setIndustry(e.target.value))}>
                  {industryList.map(i=>(
                      <option key={industryList.indexOf(i)} className="form-control w-100">{i.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                  <label className="text-left">Annual Addressable Spend</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setAddressableSpend(e.target.value)}
                    placeholder="Current pre-approved Spend (%)"
                  ></input>
              </div>

                <div className="form-group mb-3">
                  <label className="text-left">Current Pre-Appoved Spend %</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setCurrentPOSpend(e.target.value)}
                    placeholder="Current pre-approved Spend (%)"
                  ></input>
              </div>

              <div className="form-group mb-3">
                <label className="text-left">Current Negotiated Spend %</label>
                <input 
                  className="form-control"
                  type="number" 
                  onBlurCapture={(e)=>setCurrentNegotiatedSpend(e.target.value)}
                  placeholder="Current negotiated spend (%)"
                ></input>
                </div>
            </div>

          <div className="col-6 text-left">
              <h4>Volumes</h4>
              <div className="form-group mb-3">
                  <label className="text-left">Number of Suppliers Engaged</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setNumberOfSuppliers(e.target.value)}
                    placeholder="Current negotiated spend (%)"
                  ></input>
              </div>

              <div className="form-group mb-3">
                  <label className="text-left">New Suppliers Onboarded</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setNumberOfNewSuppliers(e.target.value)}
                    placeholder="Current negotiated spend (%)"
                  ></input>
              </div>

              <div className="form-group mb-3">
                  <label className="text-left">Number of POs Processed</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setNumberOfOrders(e.target.value)}
                    placeholder="Current negotiated spend (%)"
                  ></input>
                </div>

                <div className="form-group mb-3">
                  <label className="text-left">Number of Invoices Processed</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setNumberOfInvoices(e.target.value)}
                    placeholder="Current negotiated spend (%)"
                  ></input>
                </div>

                <div className="form-group mb-3">
                  <label className="text-left">Number of Payments Processed</label>
                  <input 
                    className="form-control"
                    type="number" 
                    onBlurCapture={(e)=>setNumberOfPayments(e.target.value)}
                    placeholder="Current negotiated spend (%)"
                  ></input>
                </div>
            </div>

          </div>
            <div>
              <table style={{width: "100%"}}>
                <tr>
                  <td style={{width: "75%"}}>Savings From Strategic Buying Practices</td>
                  <td style={{width: "25%", textAlign: "right"}}>{USD.format(savingsFromNegotiations)}</td>
                </tr>
                <tr>
                  <td>Savings From Improved Control & Compliance</td>
                  <td style={{width: "25%", textAlign: "right"}}>{USD.format(savingsFromControl)}</td>
                </tr>
                <tr>
                  <td>Improved Working Capital</td>
                  <td style={{width: "25%", textAlign: "right"}}>{USD.format(WorkingCapitalImpact)}</td>
                </tr>
                <tr>
                  <td>Savings from Operational Efficiencies</td>
                  <td style={{width: "25%", textAlign: "right"}}>{USD.format(savingsFromEfficiency)}</td>
                </tr>
                <tr style={{borderTop: "1px solid gray", fontWeight: "bold", fontSize:"20px"}}>
                  <td>Total Savings</td>
                  <td style={{width: "25%", color: "green", textAlign: "right"}}>{USD.format(savings)}</td>
                </tr>
              </table>
            </div>
        </div>
        <div className="col-3"></div>
        </div>
    </div>
        
    </div>
    
  );
}

export default App;
