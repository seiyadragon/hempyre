import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '..';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useState, MouseEvent } from 'react';

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

    function onMainClick(event: MouseEvent<HTMLDivElement>) {
        if (dropDownActive)
            setDropDownActive(!dropDownActive)
    }

    function onAddToCartClick(event: MouseEvent<HTMLSpanElement>) {
        
    }

    return (
        <main onClick={onMainClick}>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Shop", link: "/shop"}, {name: product.name, link: "/products" + product.name}]}/>
            <section className='container has-background-light'>
                <section className='section pt-0 mt-0 pb-0 mb-0'>
                    <ul className='columns is-multiline is-mobile'>
                        {product.images.map((image: string) => {
                            return (
                                <li key={image} className='image is-3by3 link mt-1 mb-1 column is-2'>
                                    <Link 
                                        href={image}
                                        className= {
                                            image === displayImage ? 
                                                'box pt-1 pb-1 pl-1 pr-1 has-background-success'
                                            :
                                                'box pt-1 pb-1 pl-1 pr-1 has-background-white'
                                        }
                                        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                                            onImageLinkClick(event, image)
                                        }}
                                    >
                                        <Image src={image} alt="Cant Load Image!" width={512} height={512}/>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section className='section columns mt-0 mb-0 pt-0 pb-0'>
                    <section className='column is-half mt-0'>
                        <figure className='image box is-3by3 mt-0'>
                            <Image src={displayImage} alt="Cant Load Image!" width={1024} height={1024} />
                        </figure>
                    </section>
                    <section className='column'>
                        <p className='box'>{product.description}</p>
                        <section className='box'>
                            <section className={dropDownActive ? 'dropdown is-active ml-7 mt-7' : 'dropdown ml-7 mr-7'}>
                                <button className='button is-fullwidth' onClick={onDropDownClick}>{currentFlavor.name}</button>
                                <section className='dropdown-menu'>
                                    <ul className='dropdown-content'>
                                        {product.flavors.map((flavor: any) => {
                                            return (
                                                <li key={flavor.name}>
                                                    <section
                                                        className={flavor.name === currentFlavor.name ? 'dropdown-item button is-active is-link' : 'dropdown-item button'}
                                                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                                            onFlavorClick(event, flavor)
                                                        }}  
                                                    >
                                                        {flavor.name}
                                                    </section>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section>
                            </section>
                            <br/>
                            <p className='pt-3'>{currentFlavor.description}</p>
                        </section>
                        <section className='box'>
                        <span className='is-size-4'>{"$" + product.price}</span>
                        <section className='buttons is-right'>
                            <span className='button is-success' onClick={onAddToCartClick}>Add To Cart!</span>
                        </section>
                    </section>
                    </section>
                </section>
                <section className='section'>
                    
                </section>
            </section>
        </main>
    )
}