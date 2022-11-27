import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '..';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

type ProductProps = {
    product?: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let supabaseUrl: string = process.env.SUPABASE_URL!;
    let supabaseKey: string = process.env.SUPABASE_PRIV_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey);
    let {data: products, error}: PostgrestResponse<any> = await supabase.from("Products").select().eq("name", context.query.product);

    return {
        props: {
            product: products![0]
        }
    }
}

export default function Product({product}: ProductProps) {
    return (
        <main>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}, {name: product.name, link: "/shop"}]}/>
            <section className='container'>
                <section className='section columns has-background-light'>
                    <section className='column is-2'>
                        <ul>
                            {product.images.map((image: string) => {
                                return (
                                    <li key={image} className='image is-3by3 link'>
                                        <section className='box'>
                                            <Image src={image} alt="Cant Load Image!" width={128} height={128} />
                                        </section>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                    <section className='column is-half'>
                        <span>Yuh</span>
                    </section>
                    <section className='column'>
                        <span>Yuh</span>
                    </section>
                </section>
            </section>
        </main>
    )
}