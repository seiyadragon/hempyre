import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '..';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useState, MouseEvent } from 'react';
import { parseJsonText } from 'typescript';

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

type ProductFlavor = {
    name: string,
    description: string
}

export default function Product({product}: ProductProps) {
    let [displayImage, setDisplayImage] = useState(product.images[0])
    function onImageLinkClick(event: MouseEvent<HTMLAnchorElement>, image: string) {
        event.preventDefault();
        setDisplayImage(image);
    }

    let [dropDownActive, setDropDownActive] = useState(false)
    function onDropDownClick(event: MouseEvent<HTMLButtonElement>) {
        setDropDownActive(!dropDownActive)
    }

    let [currentFlavor, setCurrentFlavor] = useState(product.flavors[0])
    function onFlavorClick(event: MouseEvent<HTMLButtonElement>, flavor: ProductFlavor) {
        setCurrentFlavor(flavor)
    }

    return (
        <main>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}, {name: product.name, link: "/shop"}]}/>
            <section className='container has-background-light'>
                <section className='section columns'>
                    <ul className='column is-2'>
                        {product.images.map((image: string) => {
                            return (
                                <li key={image} className='image is-3by3 link mt-2 mb-2'>
                                    <Link 
                                        href={image}
                                        className= {
                                            image === displayImage ? 
                                                'box pt-2 pb-2 pl-2 pr-2 has-background-dark'
                                            :
                                                'box pt-2 pb-2 pl-2 pr-2 has-background-white'
                                        }
                                        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                                            onImageLinkClick(event, image)
                                        }}
                                    >
                                        <Image src={image} alt="Cant Load Image!" width={256} height={256}/>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <section className='column is-half'>
                        <figure className='image box is-3by3 mt-2'>
                            <Image src={displayImage} alt="Cant Load Image!" width={1024} height={1024} />
                        </figure>
                    </section>
                    <section className='column'>
                        <p className='box mt-2'>{product.description}</p>
                        <section className='box mt-2'>
                            <section className={dropDownActive ? 'dropdown is-active' : 'dropdown'}>
                                <button className='button' onClick={onDropDownClick}>Select your favorite flavor</button>
                                <section className='dropdown-menu'>
                                    <ul className='dropdown-content'>
                                        {product.flavors.map((flavor: any) => {
                                            return (
                                                <li key={flavor.name}>
                                                    <button
                                                        className={flavor.name === currentFlavor ? 'dropdown-item button is-active is-primary' : 'dropdown-item button'}
                                                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                                            onFlavorClick(event, flavor)
                                                        }}  
                                                    >
                                                        {flavor.name}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section>
                            </section>
                            <br/>
                            <strong><span className='mt-1'>{currentFlavor.name}</span></strong>
                            <p className='pt-3'>{currentFlavor.description}</p>
                        </section>
                    </section>
                </section>
                <section className='box mt-0 mb-0 ml-6 mr-6'>
                    <span className='is-size-4'>{"$" + product.price}</span>
                </section>
            </section>
        </main>
    )
}