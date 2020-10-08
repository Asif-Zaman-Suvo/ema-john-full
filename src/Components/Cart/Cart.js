import React from 'react';
import './Cart.css';


const Cart = (props) => {

    const cart=props.cart

    // const total=cart.reduce((total,prd)=> total +prd.price,0)

    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        // console.log(product.price,product.quantity)

        total=total+product.price*product.quantity || 1;

        // debugger;
        
    }

    let shippingCost=0

    if (total>15){
        shippingCost=4.99
    }

    else if (total>0) {
        shippingCost=12.99
        
    }

    else if(total>0){
        shippingCost=12.99

    }

    const tax=(total/10).toFixed(2);

    const grandTotal=(total+shippingCost+Number(tax)).toFixed(2)

    const formatNumber=num=>{
        const precision=num.toFixed(2);
        return Number(precision)
    }

    
    return (
        <div className="cart-info">
            <h3>Order Summery</h3>
            <p>Item Order:{cart.length} </p>
            <p>Product Price: {formatNumber(total)}</p>

            <p><small>Shipping Cost: {shippingCost}</small></p>

            <p>Tax: {tax}</p>


            <h5>Total Price: {grandTotal}</h5>

            <br/>

            {
                props.children
            }

            
            
        </div>
    );
};

export default Cart;