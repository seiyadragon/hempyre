import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '.';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useCart, Item } from 'react-use-cart';
import { FaCannabis } from 'react-icons/fa'

type ItemQuantitySelectorProps = {
    item: Item
}

export function ItemQuantitySelector({item}: ItemQuantitySelectorProps) {
    const [inputValue, setInputValue] = useState(item.quantity!)
    const {updateItem} = useCart()

    function onItemQuantityChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value === "" || parseInt(event.target.value) < 0)
            event.target.value = "0"

        setInputValue(parseInt(event.target.value))
        let tmpItem = item
        tmpItem.quantity = parseInt(event.target.value)
        updateItem(item.id, tmpItem)
    }

    return <input className='input' type='number' value={inputValue} onChange={onItemQuantityChange}></input>
}

type ProductImageProps = {
    item: Item,
    products: Array<any>
}

export function ProductImage({item, products}: ProductImageProps) {
    let productImage = ""
    products.map((product) => {
        if (product.id === item.id) {
            productImage = product.images[0]
        }
    })

    return <Image src={productImage} alt="Cannot load image!" width={128} height={128}/>
}

type CartProps = {
    products: Array<any>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let supabaseUrl: string = process.env.SUPABASE_URL!;
    let supabaseKey: string = process.env.SUPABASE_PRIV_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey);
    let {data: products, error}: PostgrestResponse<any> = await supabase.from("Products").select();

    return {
        props: {
            products: products
        }
    }
}

export default function Cart({products}: CartProps) {
    const {items, removeItem, emptyCart, cartTotal} = useCart()
    const [hydratedItems, setHydratedItems] = useState(Array<Item>)
    const [cartTotalValue, setCartTotal] = useState(0)

    useEffect(() => {
        setHydratedItems(items)
        setCartTotal(cartTotal)
    }, [items, cartTotal])

    function onCheckOutClick(event: MouseEvent) {
        
    }

    return (
        <main>
            <HeadSettings title={`Cart(${hydratedItems.length})`}/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}, {name: `Cart(${hydratedItems.length})`, link: "/cart"}]}/>
            <section className='container has-background-light'>
                <ul className='section'>
                    {hydratedItems.map((item) => {
                        return (
                            <li key={item.id} className='box has-background-white'>
                                <section className='section mt-0 mb-0 pt-0 pb-0  has-text-centered'>
                                    <span className='subtitle'>{item.name}</span>
                                </section>
                                <section className='section columns mt-0 mb-0 pt-0 pb-0 is-mobile'>
                                    <section className='column is-half'>
                                        <ProductImage item={item} products={products}/>
                                    </section>
                                    <span className='subtitle column is-half has-text-right'>{"$" + item.price}</span>
                                </section>
                                <section className='section mt-0 mb-0 pt-0 pb-0'>
                                    <section className='column columns is-third is-mobile'>
                                        <section className='column is-half'>
                                            <section className='column is-3'>
                                                <ItemQuantitySelector item={item} />
                                            </section>
                                        </section>
                                        <span className='subtitle column is-half has-text-right'>{"$" + (item.itemTotal!).toFixed(2)}</span>
                                    </section>
                                </section>
                                <section className='section mt-0 mb-0 pt-0 pb-0'>
                                    <span 
                                        className='button is-danger is-fullwidth'
                                        onClick={function(event: MouseEvent<HTMLSpanElement>) {
                                            removeItem(item.id)
                                        }}
                                    >
                                        Remove
                                    </span>
                                </section>
                            </li>
                        )
                    })}
                    {hydratedItems.length == 0 &&
                        <p className='subtitle'>
                            Your cart is empty. Be sure to browse our <Link href="/shop">shop</Link> for the best selection of <FaCannabis /> products!
                        </p>    
                    }
                </ul>
                <section className='section'>
                    <section className='box'>
                        <section className='section has-text-centered'>
                            <span className='subtitle'>{"$" + cartTotalValue.toFixed(2)}</span>
                        </section>
                        <ul className='section columns is-mobile has-background-white'>
                            <li className='column is-half' key='checkout'>
                                <span className='button is-primary is-fullwidth' onClick={onCheckOutClick}>Check Out</span>
                            </li>
                            <li className='column is-half' key='empty'>
                                <span className='button is-danger is-fullwidth' onClick={() => emptyCart()}>Empty Cart</span>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
        </main>
    )
}