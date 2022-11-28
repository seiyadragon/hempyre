import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '..';
import { createClient, PostgrestResponse, SupabaseClient, User } from '@supabase/supabase-js';
import {useState, MouseEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router';

export default function Account() {
    let [emailValue, setEmailValue] = useState("")
    let [passwordValue, setPasswordValue] = useState("")

    let supabaseUrl: string = 'https://knqniswvwblfgsnidcxv.supabase.co';
    let supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucW5pc3d2d2JsZmdzbmlkY3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk1MTUyODAsImV4cCI6MTk4NTA5MTI4MH0.a76WRpCXNDdDjtJo6-fyjtIOY2QzOnLC503sh5ZunF4';

    let supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    })
    let router = useRouter()

    async function onLoginClick(event: MouseEvent<HTMLSpanElement>) {
        setEmailValue("")
        setPasswordValue("")
        await supabase.auth.signInWithPassword({email: emailValue, password: passwordValue})
        const {data: {user} } = await supabase.auth.getUser()
        
        router.push("/account/" + user?.id)
    }

    async function onSignUpClick(event: MouseEvent<HTMLSpanElement>) {
        setEmailValue("")
        setPasswordValue("")
        await supabase.auth.signUp({email: emailValue, password: passwordValue})
    }

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmailValue(event.target.value)
    }

    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPasswordValue(event.target.value)
    }

    return (
        <main>
            <HeadSettings title="Account"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Account", link: "/account"}]}/>
            <section className='container has-background-light'>
                <section className='box'>
                    <span className='title'>Login</span>
                    <input className='input mt-2' placeholder='Email' type="email" onChange={onEmailChange} value={emailValue}/>
                    <input className='input mt-2' placeholder='Password' type="password" onChange={onPasswordChange} value={passwordValue}/>
                    <section className='buttons is-right'>
                        <span className='button mt-2 is-success' onClick={onLoginClick}>Login</span>
                        <span className='button mt-2 is-link' onClick={onSignUpClick}>Sign Up</span>
                    </section>
                </section>
            </section>
        </main>
    )
}