import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '.';
import { createClient, PostgrestResponse } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';

export type ShopProps = {
    products: Array<any>,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let searchValue: string = (context.query.search === undefined) ? String("") : String(context.query.search!);

    let supabaseUrl: string = process.env.SUPABASE_URL!;
    let supabaseKey: string = process.env.SUPABASE_PRIV_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey);
    let {data: products, error}: PostgrestResponse<any> = await supabase.from("Products").select();

    console.log("Search Value:" + searchValue)

    let filteredProducts: Array<any> = []
    products?.map((product) => {
        if (product.name.toString().toLocaleLowerCase().includes(searchValue.toString().toLocaleLowerCase()))
            filteredProducts.push(product)
    })

    return {
        props: {
            products: filteredProducts
        }
    }
}

export default function Shop({products}: ShopProps) {
    let router = useRouter()
    let [searchBarValue, setSearchBarValue] = useState("")
    const {addItem} = useCart()

    function onSearchBarChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchBarValue(event.target.value)
    }

    function onSearchBarKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            router.push("/shop?search=" + searchBarValue)
        }
    }

    return(
        <main>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}]}/>
            <section className='container has-background-light'>
                <section className='section pb-0 mb-0'>
                    <span className='title'>Shop</span>
                    <br />
                    <input
                        className='input mt-2 pt-0 mb-0 pb-0'
                        placeholder='Search for products here...'
                        value={searchBarValue}
                        onChange={onSearchBarChange}
                        onKeyDown={onSearchBarKeyDown}
                    />
                </section>
                <ul className='section columns'>
                    {products.map((product) => {
                        return (
                            <li key={product.id} className='column is-2'>
                                <Link href={"/products/" + product.name}>
                                    <section className='card has-shadow'>
                                        <section className='card-header is-white'>
                                            <span className='card-header-title has-text-centered'>{product.name}</span>
                                        </section>
                                        <section className='card-image is-white'>
                                            <figure className='image is-3by3'>
                                                <Image src={product.images[0]} alt="Image not found!" width={256} height={256}/>
                                            </figure>
                                        </section>
                                        <section className='card-footer is-white'>
                                            <span className='card-footer-item'>{"$" + product.price}</span>
                                        </section>
                                    </section>
                                </Link>
                                <span 
                                    className='button is-primary is-fullwidth' 
                                    onClick={function onButtonClick() {
                                        let item = {
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: 1
                                        }

                                        addItem(item)
                                    }
                                }>
                                    Add to Cart
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}