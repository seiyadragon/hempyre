import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '.';
import { createClient, PostgrestResponse } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'

export type ShopProps = {
    products: Array<any>
}

export async function getServerSideProps() {
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

export default function Shop({products}: ShopProps) {
    return(
        <main>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}]}/>
            <section className='container'>
                <section className='section pb-0 mb-0 has-background-light'>
                    <span className='title'>Shop</span>
                    <br />
                    <input className='input mt-2 pt-0 mb-0 pb-0'></input>
                </section>
                <ul className='section columns has-background-light'>
                    {products.map((product) => {
                        return (
                            <li key={product.id} className='column is-2'>
                                <Link href={"/products/" + product.name}>
                                    <section className='card has-shadow'>
                                        <section className='card-header is-white'>
                                            <span className='card-header-title has-text-centered'>{product.name}</span>
                                        </section>
                                        <section className='card-image is-white'>
                                            <figure className='image is-1by1'>
                                                <Image src={product.images[0]} alt="Image not found!" width={128} height={128}/>
                                            </figure>
                                        </section>
                                        <section className='card-footer is-white'>
                                            <span className='card-footer-item'>{"$" + product.price}</span>
                                        </section>
                                    </section>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}