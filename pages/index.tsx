import Head from "next/head"
import 'bulma/css/bulma.min.css';
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
                    <Image src="/hempyre.png" width={128} height={64} alt="Logo Cannot be Loaded" style={{"maxHeight": "85px"}}/>
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
                        <span className="title">Introduction</span>
                        <p>
                            Hemp is one of the oldest plants know to mankind.
                            For thousands of years, it was used in the production
                            of fabrics, rope. And more specifically cannabis 
                            a relaive of hemp, with higher levels of the compound delta9-thc 
                            as a remedy for illness, both physical and mental. In modern times,
                            governments have not been so kind to cannabis and hemp, with both
                            being banned in most countries in the world. 
                        </p>
                    </section>
                </section>
            </header>
        </main>
    )
}