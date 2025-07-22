import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { navLinks } from "../section/Header";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOutDetails } from "@/redux/userSlice";
import { api, ENDPOINT } from "@/lib/api";
import { useRouter } from "next/navigation";

const ProfileSheet = () => {
    const [open, setOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await api.get(ENDPOINT.logout);
            console.log("res", res.data);
            if (res.data.status === "success") {
                dispatch(userLoggedOutDetails());
                // send to home page 
                router.push("/");
            }
        } catch (err) {
            console.log("err: ", err);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Image
                    src="/profile.avif"
                    alt="Profile Icon"
                    className="ml-4 h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                />
            </SheetTrigger>
            <SheetContent side={"right"} className="px-6 overflow-y-scroll">
                <div className="relative bg-[#14161a] p-6 pt-[80px] flex flex-col items-center gap-4 rounded-lg w-[300px] mx-auto mt-12">
                    <div className="absolute -top-[50px] left-1/2 -translate-x-1/2">
                        {!userData.isLoggedIn ? (
                            <Image
                                src="/profile.avif"
                                alt="Profile Icon"
                                className="h-[100px] w-[100px] rounded-full object-cover shadow-lg"
                                width={100}
                                height={100}
                            />
                        ) : (
                            <div className="h-[100px] w-[100px] rounded-full bg-[#0059A3] text-4xl font-semibold flex items-center justify-center text-white shadow-lg">
                                {userData.user ? userData.user.name.charAt(0).toUpperCase() : ""}
                            </div>
                        )}
                    </div>

                    <p className="text-xl font-bold capitalize mt-2 text-white">
                        {userData.isLoggedIn ? userData.user.name : "Guest"}
                    </p>

                    <Link
                        href={`${userData.isLoggedIn ? "/" : "/login"}`}
                        className="rounded-full font-medium text-base px-6 py-2 bg-yellow-400 text-black hover:bg-yellow-500 transition"
                        onClick={() => {
                            setOpen(false);
                            if (userData.isLoggedIn) {
                                handleLogout();
                            }
                        }}
                    >
                        {userData.isLoggedIn ? "Logout" : "Login"}
                    </Link>
                </div>


                <div className="divide-y my-4">
                    <Link
                        href={"/subscription"}
                        className="flex items-center justify-between px-2 py-4 text-sm"
                        onClick={() => {
                            setOpen(false);

                        }}
                    >
                        Subscribe Now
                        <ChevronRightIcon className="w-6 h-6" />
                    </Link>
                    <div>
                        {navLinks.map((link) => (
                            <Link
                                href={link.href}
                                key={link.key}
                                className="flex items-center justify-between px-2 py-4 text-sm"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                {link.name}
                                <ExternalLinkIcon className="w-4 h-4" />
                            </Link>
                        ))}
                    </div>
                    <Link
                        href={"/"}
                        className="flex items-center justify-between px-2 py-4 text-sm"
                    >
                        Help and Legal
                        <ChevronRightIcon className="w-6 h-6" />
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProfileSheet;
