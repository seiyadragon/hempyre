import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '.';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import {useState, MouseEvent, ChangeEvent } from 'react'
import { GetServerSideProps } from 'next';

type AccountProps = {
    supabase: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let supabaseUrl: string = process.env.SUPABASE_URL!;
    let supabaseKey: string = process.env.SUPABASE_PUB_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey);

    return {
        props: {
            supabase: supabase
        }
    }
}

export default function Account({supabase}: AccountProps) {
    let [emailValue, setEmailValue] = useState("")
    let [passwordValue, setPasswordValue] = useState("")

    function onLoginClick(event: MouseEvent<HTMLSpanElement>) {
        console.log(passwordValue)
    }

    function onSignUpClick(event: MouseEvent<HTMLSpanElement>) {
        
    }

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmailValue(event.target.value)
    }

    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPasswordValue(event.target.value)
    }

    return (
        <main>
            <HeadSettings title="Shop"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Account", link: "/account"}]}/>
            <section className='container has-background-light'>
                <section className='box'>
                    <span className='title'>Login</span>
                    <input className='input mt-2' placeholder='Email' type="email" onChange={onEmailChange}/>
                    <input className='input mt-2' placeholder='Password' type="password" onChange={onPasswordChange}/>
                    <section className='buttons is-right'>
                        <span className='button mt-2 is-success' onClick={onLoginClick}>Login</span>
                        <span className='button mt-2 is-link' onClick={onSignUpClick}>Sign Up</span>
                    </section>
                </section>
            </section>
        </main>
    )
}