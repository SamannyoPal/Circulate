import { auth } from "@/auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = req.auth?.user.accessToken ? true : false;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //Hard coding this because i am dumb. Please forgive.
    
    if(nextUrl.pathname === '/'){
        if(!isLoggedIn){
            return NextResponse.redirect(new URL('/login',nextUrl));
        }
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    if(nextUrl.pathname === '/upload' || nextUrl.pathname === '/upload/new' || nextUrl.pathname === '/receive' || nextUrl.pathname === '/profile'){
        if(!isLoggedIn){
            return NextResponse.redirect(new URL('/login',nextUrl));
        }
    }
    

    //I am very very sorry.
    

    if (isApiAuthRoute){
        return NextResponse.next();
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    
    return NextResponse.next();
});

export const config = {
    matchers: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
,"/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};