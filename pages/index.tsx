import 'bulma/css/bulma.min.css';
import Head from "next/head"
import Link from "next/link";
import Image from 'next/image'
import {useEffect, useState} from 'react'
import { GetServerSideProps } from 'next';
import { createClient, User } from '@supabase/supabase-js';
import { useCart } from 'react-use-cart';

export function NavBar() {
    let [isMenuActive, setMenuActive] = useState(false)

    function menuOnClick() {
        setMenuActive(!isMenuActive)
    }

    const { totalUniqueItems } = useCart()
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setTotalItems(totalUniqueItems)
    }, [totalUniqueItems])

    return (
        <nav className="navbar is-dark">
            <section className="navbar-brand">
                <span className="navbar-item">
                    <figure className='image is-3by3'>
                        <Image src="/hempyre.png" width={128} height={128} alt="Logo Cannot be Loaded" style={{"maxHeight": "45px"}}/>
                    </figure>
                </span>
                <section className="navbar-burger" onClick={menuOnClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </section>
            </section>
            <section className={"navbar-menu is-dark " + (isMenuActive ? "is-active" : "")}>
                <section className="navbar-end">
                    <Link href="/" className="navbar-item">
                        <span>Home</span>
                    </Link>
                    <Link href="/shop" className="navbar-item">
                        <span>Shop</span>
                    </Link>
                    <Link href="/cart" className="navbar-item">
                        <span>Cart({totalItems})</span>
                    </Link>
                </section>
            </section>
        </nav>
    )
}

type BreadCrumbProps = {
    pages: Array<BreadCrumbPage>
}

type BreadCrumbPage = {
    name: string,
    link: string
}

export function BreadCrumb({pages}: BreadCrumbProps) {
    return (
        <section className="section pt-4 pb-4">
            <nav className="breadcrumb has-arrow-separator">
                <ul className="container is-size-6">
                    {pages != null && pages.map((page, index) => {
                        let isActive = false
                        if (index == pages.length - 1)
                            isActive = true

                        return (
                            <li key={index} className={isActive ? "is-active is-size-5" : "is-size-5"}>
                                <Link className={isActive ? "has-text-black" : "has-text-grey"} href={page.link.toString().toLocaleLowerCase()}>
                                    {page.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </section>
    )
}

type HeadSettingsProps = {
    title: string
}

export function HeadSettings({title}: HeadSettingsProps) {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/hemp.png"/>
            <title>{title}</title>
        </Head>
    )
}

export default function Home() {
    return (
        <main className="main">
            <section style={{"backgroundColor": "rbg(0, 0, 0, 0)"}}>
                <HeadSettings title="Hempyre" />
                <NavBar/>
                <BreadCrumb pages={[{name: "HemPyre", link: "/"}]}/>
                <section className="container">
                    <section className="section has-background-light">
                        <span className="title">[Introduction]</span>
                        <p className="pl-4 pt-1">
                            Hemp is one of the oldest plants known to mankind.
                            For thousands of years, it was used in the production
                            of fabrics, and rope. And its cousin cannabis 
                            containing naturally higher levels of the psychoactive compound <strong>delta-9-thc</strong> was 
                            used as a remedy for illness, both physical and mental. In modern times,
                            governments have not been so kind to cannabis and hemp, with both
                            being banned in most countries in the world. However with the introduction
                            of The Farm Bill Act of 2018, hemp and many products derived from it became legalized.
                            At first it was mostly <strong>cbd</strong> which does not have any intoxicating effects products being
                            made but soon scientists discovered that, both cannabis and hemp contain <strong>delta-8-thc</strong> as
                            well as <strong>delta-10-thc</strong> compounds with very similar effects to <strong>delta-9-thc</strong>,
                            in my personal opinion the effects
                            are mostly the same, but requires smoking a lot more of it for the same effects. 
                            Soon after other compounds followed such as <strong>hhc</strong>, which I personally cannot tell the difference
                            between it and <strong>delta-9-thc</strong>, as well as the <strong>delta-8 and 9-thc-o</strong> synthetic variants
                            which many people report success with, however to me it did not feel very strong, it was more calming like 
                            pure <strong>delta-8-thc</strong>. <strong>Delta-10-thc</strong> was in my opinion very similar to <strong>delta-8-thc</strong>,
                            maybe a bit stronger, but I never used it as much as some of the others since my go-to other than <strong>delta-9-thc</strong>,
                            is <strong>hhc</strong>.
                        </p>
                    </section>
                    <section className="section pt-1 has-background-light">
                        <span className="title">[Goals]</span>
                        <p className="pl-4 pt-1">
                            Our goals are simple. We want to bring <strong>YOU</strong> all the latest and safe hemp/cannabis products
                            currently available in the market,
                            that are currently legal in <strong>The United States</strong> for the best price we can afford. We also
                            put a lot of effort into reasearch for all our products to make sure <strong>YOU</strong>,
                            have access to all the information available about our products. Here at <strong>HempPyre</strong>,
                            we like to know what {"we\'re"} putting in our bodies, and we believe <strong>YOU</strong> have the right to know too.
                        </p>
                    </section>
                    <section className='section pt-1 has-background-light'>
                        <span className='title'>[FDA Disclaimer]</span>
                        <p className='pl-4 pt-1'>
                            <strong>
                                This product is not for use by or sale to persons under the age of 18 or 21 depending on the laws of your governing state or territory. 
                                The statements made regarding these products have not been evaluated by the Food and Drug Administration. 
                                The efficacy of these products has not been confirmed by FDA-approved research. 
                                These products are not intended to diagnose, treat, cure or prevent any disease. 
                                All information from health care practitioners. 
                                Please consult your healthcare professional about potential interactions or other possible complications before using any product. 
                                The Federal Food, Drug, and Cosmetic Act require this notice. 
                                By using this site you agree to follow the Privacy Policy and all Terms & Conditions printed on this site. 
                                Void Where Prohibited By Law. 
                                Derived from 100% Legal USA Hemp and contains less than 0.3% Delta-9 THC in accordance with the 2018 Farm Bill.
                            </strong>
                        </p>
                    </section>
                </section>
            </section>
        </main>
    )
}