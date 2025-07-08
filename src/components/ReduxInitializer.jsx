"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserRole } from "@/lib/reduxStore/userTypeSlice";

export default function ReduxInitializer() {
    const dispatch = useDispatch();
console.log("bla nla")
    useEffect(() => {
        dispatch(fetchUserRole());
    }, [dispatch]);

    return null; 
}
