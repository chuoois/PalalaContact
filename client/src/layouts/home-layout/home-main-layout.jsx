import { Outlet } from "react-router-dom";
import { Header } from "../home-layout/home-header-layout";
import { Footer } from "../home-layout/home-footer-layout";

export const HomeLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};