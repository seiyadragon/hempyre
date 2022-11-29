import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '.';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useState, MouseEvent } from 'react';
import { useCart } from 'react-use-cart';

export default function Cart() {
    const {items} = useCart()
    console.log(items)
    return (
        <main>
            <HeadSettings title="Cart"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Cart", link: "/cart"}]}/>
            <section className='container has-background-light'>
                {items.length > 0 && <ul className='section'>
                    {items.map((item) => {
                        
                        if (item !== null) {
                            return (
                                <li key={item.id} className='box has-background-white'>
                                    <span className='title'>{item.name}</span>
                                    <span className=''></span>
                                </li>
                            )
                        } else {
                            return (
                                <li key="fuck">
                                    <span className='title'>MHM</span>
                                </li>
                            )
                        }
                    })}
                </ul>}
            </section>
        </main>
    )
}