import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
    },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.API_BASR_URL}/auth/login`,{
                    method: 'post',
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        passowrd: credentials?.password,
                    })
                });

                const data = await res.json();

                if (res.ok && data.token){
                    return { token: data.token }
                }else{
                    return null;
                }
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }){
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken as string,
            };
            return session;
        }
    }
})