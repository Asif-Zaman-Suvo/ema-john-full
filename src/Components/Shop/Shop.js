import React, { useState, useEffect } from 'react';

import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {

    // const first10=fakeData.slice(0,10)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        fetch('https://thawing-dawn-33508.herokuapp.com/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();

        const productKeys = Object.keys(savedCart);


        fetch('https://thawing-dawn-33508.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })

            .then(res => res.json())
            .then(data => setCart(data))
    }, [])


    const handleSearch=event=>{
        setSearch(event.target.value);


    }



    const handleAddProduct = (product) => {

        const toBeAddedKey = product.key

        const sameProduct = cart.find(pd => pd.key === product.key)

        let count = 1
        let newCart;

        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count

            const others = cart.filter(pd => pd.key !== toBeAddedKey)

            newCart = [...others, sameProduct];
        }

        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        // const count=sameProduct.length

        console.log('product added', product)
        // const newCart=[...cart,product];
        setCart(newCart);

        // const sameProduct=newCart.filter(pd=>pd.key===product.key)

        // const count=sameProduct.length

        addToDatabaseCart(product.key, count)

    }



    return (
        <div className='twin-container'>

            <div className='product-container'>
               <input placeholder="search" type="text" onBlur={handleSearch}className="product-search"/>


                {
                    products.map(pd =>
                        <Product key={pd.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={pd}>

                        </Product>)
                }



            </div>

            <div className='cart-container'>

                <Cart cart={cart}>
                    <Link to='/review'>

                        <button className='main-button'>Review Order</button>

                    </Link>
                </Cart>

            </div>




        </div>
    );
};

export default Shop;