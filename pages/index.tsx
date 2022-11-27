import 'bulma/css/bulma.min.css';
import Head from "next/head"
import Link from "next/link";
import Image from 'next/image'
import {useState} from 'react'

export function NavBar() {
    let [isMenuActive, setMenuActive] = useState(false)

    function menuOnClick() {
        setMenuActive(!isMenuActive)
    }

    return (
        <nav className="navbar is-dark">
            <section className="navbar-brand">
                <span className="navbar-item">
                    <figure className='image is-128x64'>
                        <Image src="/hempyre.png" width={128} height={64} alt="Logo Cannot be Loaded" style={{"maxHeight": "85px"}}/>
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
                    <Link href="/account" className="navbar-item">
                        <span>Account</span>
                    </Link>
                    <Link href="/cart" className="navbar-item">
                        <span>Cart</span>
                    </Link>
                </section>
            </section>
        </nav>
    )
}

type BreadCrumbProps = {
    pages: Array<string>
}

export function BreadCrumb({pages}: BreadCrumbProps) {
    return (
        <section className="section pt-4 pb-0">
            <nav className="breadcrumb has-arrow-separator">
                <ul className="container is-size-6">
                    {pages != null && pages.map((page, index) => {
                        let isActive = false
                        if (index == pages.length - 1)
                            isActive = true

                        return (
                            <li key={index} className={isActive ? "is-active" : ""}>
                                <Link 
                                    className={isActive ? "has-text-black" : "has-text-grey"}
                                    href={"/" + (page.toLocaleLowerCase() === "hempyre" ? "" : page.toLocaleLowerCase())}
                                >
                                    {page}
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
            <HeadSettings title="Hempyre" />
            <header>
                <NavBar />
                <BreadCrumb pages={["Hempyre"]}/>
                <section className="container">
                    <section className="section">
                        <span className="title">[Introduction]</span>
                        <p className="pl-4 pt-1">
                            Hemp is one of the oldest plants known to mankind.
                            For thousands of years, it was used in the production
                            of fabrics, and rope. And it's cousin cannabis 
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
                            maybe a bit stronger, but I never used it as much as some of the others since my goto othern than <strong>delta-9-thc</strong>,
                            is <strong>hhc</strong>.
                        </p>
                    </section>
                    <section className="section pt-1">
                        <span className="title">[Goals]</span>
                        <p className="pl-4 pt-1">
                            Our goals are simple. We want to bring <strong>YOU</strong> all the latest and safe hemp/cannabis products
                            currently available in the market,
                            that are currently legal in all 50 states for the best price we can afford. We also
                            put a lot of effort into reasearch for all our products to make sure <strong>YOU</strong>,
                            have access to all the information available about our products. Here at <strong>HempPyre</strong>,
                            we like to know what we're putting in our bodies, and we believe <strong>YOU</strong> have the right to know too.
                        </p>
                    </section>
                </section>
            </header>
        </main>
    )
}