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
            <BreadCrumb pages={["Hempyre", "Shop"]}/>
            <section className='container'>
                <section className='section pb-0 mb-0'>
                    <span className='title'>Shop</span>
                    <br />
                    <input className='input mt-2 mb-0 pb-0'></input>
                </section>
                <ul className='section columns'>
                    {products.map((product) => {
                        return (
                            <li key={product.id} className='column is-2'>
                                <Link href={"/shop/" + product.id} className="card is-primary">
                                    <section className='card'>
                                        <section className='card-header'>
                                            <span className='card-header-title'>{product.product_info.name}</span>
                                        </section>
                                        <section className='card-image'>
                                            <figure className='image is-128x128'>
                                                <Image src={product.product_info.image} alt="Image not found!" width={128} height={128}/>
                                            </figure>
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