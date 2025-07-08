// import { NextResponse } from "next/server";
// export function middleware(req) {
//     const token = req.cookies.get("token")?.value;
//     const role = req.cookies.get("role")?.value;
//     const url = req.nextUrl.clone();
//     const protectedRoutes = ["/homePage","/startUpProfile","/startupEdit","/charityEdit","/investorEdit","/supportOrganizationEdit","/IncubatorProfile","/investorProfile","/charityProfile"];
//     const reverseProtectedRoutes = ["/Login","/","/charity","/IncubatorSignUp","/InvestorSignUp","/startUpSignUp"];
//     if (reverseProtectedRoutes.includes(url.pathname) && token) {
//         url.pathname = "/homePage"; 
//         return NextResponse.redirect(url);
//     }
//     if (protectedRoutes.includes(url.pathname) && !token) {
//         url.pathname = "/Login"; 
//         return NextResponse.redirect(url);
//     }
//     return NextResponse.next(); 
// }

// export const config = {
//     matcher: ["/homePage","/startupEdit","/charityEdit","/investorEdit","/supportOrganizationEdit", "/Login","/","/charity","/IncubatorSignUp","/InvestorSignUp","/startUpSignUp","/startUpProfile","/IncubatorProfile","/investorProfile","/charityProfile"], 
// };

// // انا عاوز دول  "/charityEdit"  , "/charityProfile" ما يدخلهمش عير لما يكون الرول يساوي charityOrganization
// // انا عاوز دول  "/startupEdit", "/startUpProfile"ما يدخلهمش عير لما يكون الرول يساوي company
// // انا عاوز دول  "/investorEdit","/investorProfile"ما يدخلهمش عير لما يكون الرول يساوي investor
// // انا عاوز دول  "/supportOrganizationEdit","/IncubatorProfile"ما يدخلهمش عير لما يكون الرول يساوي supportOrganization


// import { NextResponse } from "next/server";

// export function middleware(req) {
//     const token = req.cookies.get("token")?.value;
//     const id = req.cookies.get("id")?.value;
//     const role = req.cookies.get("role")?.value;
//     const url = req.nextUrl.clone();
//     const protectedRoutes = [
//         "/homePage", "/startUpProfile", "/startupEdit", "/charityEdit", "/investorEdit", 
//         "/supportOrganizationEdit", "/IncubatorProfile", "/investorProfile", "/charityProfile","/savedProfiles"
//     ];
//     const reverseProtectedRoutes = [
//         "/Login", "/", "/charity", "/IncubatorSignUp", "/InvestorSignUp", "/startUpSignUp"
//     ];
//     if (reverseProtectedRoutes.includes(url.pathname) && token) {
//         url.pathname = "/homePage";
//         return NextResponse.redirect(url);
//     }
//     if (protectedRoutes.includes(url.pathname) && !token) {
//         url.pathname = "/Login";
//         return NextResponse.redirect(url);
//     }
//     const roleRoutes = {
//         charityOrganization: ["/charityEdit", "/charityProfile"],
//         company: ["/startupEdit", "/startUpProfile"],
//         investor: ["/investorEdit", "/investorProfile"],
//         supportOrganization: ["/supportOrganizationEdit", "/IncubatorProfile"],
//     };
//     for (const [allowedRole, paths] of Object.entries(roleRoutes)) {
//         if (paths.includes(url.pathname) && role !== allowedRole) {
//             url.pathname = "/homePage";
//             return NextResponse.redirect(url);
//         }
//     }
//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         "/homePage", "/startupEdit", "/charityEdit", "/investorEdit", "/supportOrganizationEdit",
//         "/Login", "/", "/charity", "/IncubatorSignUp", "/InvestorSignUp", "/startUpSignUp",
//         "/startUpProfile", "/IncubatorProfile", "/investorProfile", "/charityProfile","/savedProfiles"
//     ],
// };


import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const id = req.cookies.get("id")?.value;
    const role = req.cookies.get("role")?.value;
    const url = req.nextUrl.clone();

    const pathname = url.pathname;

    const protectedRoutes = [
        "/homePage", "/startUpProfile", "/startupEdit", "/charityEdit", "/investorEdit", "/search/*", "/search",
        "/supportOrganizationEdit", "/IncubatorProfile", "/investorProfile", "/charityProfile","/savedProfiles","/notifications"
    ];
    const reverseProtectedRoutes = [
        "/Login", "/", "/charity", "/IncubatorSignUp", "/InvestorSignUp", "/startUpSignUp"
    ];

    // ✅ منع الدخول للصفحة العامة لو هو صاحب الـ ID
    const dynamicRedirects = [
        { pattern: /^\/charaties\/([^\/]+)$/, cookieRole: "charityOrganization", redirectTo: "/charityProfile" },
        { pattern: /^\/incubators\/([^\/]+)$/, cookieRole: "supportOrganization", redirectTo: "/IncubatorProfile" },
        { pattern: /^\/investors\/([^\/]+)$/, cookieRole: "investor", redirectTo: "/investorProfile" },
        { pattern: /^\/startUps\/([^\/]+)$/, cookieRole: "company", redirectTo: "/startUpProfile" },
    ];

    for (const { pattern, cookieRole, redirectTo } of dynamicRedirects) {
        const match = pathname.match(pattern);
        if (match) {
            const routeId = match[1];
            if (token && role === cookieRole && id === routeId) {
                url.pathname = redirectTo;
                return NextResponse.redirect(url);
            }
        }
    }

    if (reverseProtectedRoutes.includes(pathname) && token) {
        url.pathname = "/homePage";
        return NextResponse.redirect(url);
    }

    if (protectedRoutes.includes(pathname) && !token) {
        url.pathname = "/Login";
        return NextResponse.redirect(url);
    }

    const roleRoutes = {
        charityOrganization: ["/charityEdit", "/charityProfile"],
        company: ["/startupEdit", "/startUpProfile"],
        investor: ["/investorEdit", "/investorProfile"],
        supportOrganization: ["/supportOrganizationEdit", "/IncubatorProfile"],
    };

    for (const [allowedRole, paths] of Object.entries(roleRoutes)) {
        if (paths.includes(pathname) && role !== allowedRole) {
            url.pathname = "/homePage";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/homePage", "/startupEdit", "/charityEdit", "/investorEdit", "/supportOrganizationEdit",
        "/Login", "/", "/charity", "/IncubatorSignUp", "/InvestorSignUp", "/startUpSignUp",
        "/startUpProfile", "/IncubatorProfile", "/investorProfile", "/charityProfile","/savedProfiles",
        // ✅ مهم: إضافة المسارات الديناميكية
        "/charaties/:id*",
        "/incubators/:id*",
        "/investors/:id*",
        "/startUps/:id*","/notifications"
    ],
};
