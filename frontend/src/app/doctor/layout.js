"use client"
import { useDispatch } from "react-redux";
import { authedAction } from "../redux/actions/authActions";
import { ReduxProvider } from "../redux/provider";

export default function Layout({ children }) {
    const dispatch = useDispatch();
    dispatch(authedAction('doctor'));

    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}