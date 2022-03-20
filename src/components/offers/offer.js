import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import React from 'react'
export const Offer = () =>{


    return (

        <div className="offerContainer">
           <div className="row col-md-12 d-flex justify-content-center">
               <div className='col-md-8 d-flex justify-content-center'>
                     <img src={ups} />
               </div>

           </div>
           <div className= "row col-md-12">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                    Name
                    <div className='bold'>ups</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                    Price
                    <div className='bold'>130$</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                    Sender
                    <div className='bold'>The Sender</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                 <div className='offerDetail '>
                    Recipient
                    <div className='bold'>The Recipient</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                    Shippment Type
                    <div className='bold'>The Type</div>
                </div>
              </div>
              
           </div>

        </div>
    )
}