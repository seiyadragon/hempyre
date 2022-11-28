import 'bulma/css/bulma.min.css';
import { NavBar, BreadCrumb, HeadSettings } from '..';
import { createClient, PostgrestResponse, User } from '@supabase/supabase-js';
import {useState, MouseEvent, ChangeEvent } from 'react'
import { GetServerSideProps } from 'next';

type UserDetailProps = {
    user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let supabaseUrl: string = process.env.SUPABASE_URL!;
    let supabaseKey: string = process.env.SUPABASE_PRIV_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    })

    const {data: {user} } = await supabase.auth.getUser()

    return {
        props: {
            user: user
        }
    }
}

export default function UserDetails({user}: UserDetailProps) {
    return (
        <main>
            <HeadSettings title="Account"/>
            <NavBar />
            <BreadCrumb pages={[{name: "HemPyre", link: "/"}, {name: "Account", link: "/account"}, {name: user?.id, link: "/account" + user?.id}]}/>
        </main>
    )
}