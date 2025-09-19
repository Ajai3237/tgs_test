"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Variants for parent ul to stagger children
    const listVariants = {
        open: { transition: { staggerChildren: 0.15 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    // Variants for each li
    const itemVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: 50, opacity: 0 },
    };

    return (
        <header className="w-full z-50 bg-transparent absolute left-0 -top-23">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

                {/* Logo */}
                <div className="flex-shrink-0 ">
                    <img
                        src="/Assets/logo.png"
                        alt="Logo"
                        className="w-[300px] h-auto"
                    />
                </div>




                <div className="relative">
                    {/* Hamburger button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white z-50 relative p-2 transition-transform duration-200 hover:scale-110"
                    >
                        {isOpen ? <X size={36} /> : <Menu size={36} />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Optional full-screen backdrop (click to close) */}
                                <motion.div
                                    key="backdrop"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="fixed inset-0 z-30"
                                    onClick={() => setIsOpen(false)}
                                />

                                {/* Menu sliding in from the right, fixed so it hugs the viewport edge */}
                                <motion.div
                                    key="menu"
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 0.28, ease: "easeInOut" }}
                                    style={{borderRadius:'40px'}}
                                    className={`
                                                fixed top-30 right-0 z-40 h-80  
                                                w-64 max-w-[85vw  bg-black/60 text-white flex items-center justify-center backdrop-blur-sm p-6
                                                   `}
                                >
                                    {/* The menu content (ul) remains the same */}
                                    <motion.ul
                                        variants={listVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="flex flex-col space-y-6 text-center text-lg md:text-xl font-medium"
                                    >
                                        <motion.li variants={itemVariants} className="cursor-pointer hover:text-yellow-400">
                                            <Link href="/">Home</Link>
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="cursor-pointer hover:text-yellow-400">
                                            <Link href="/About">About</Link>
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="cursor-pointer hover:text-yellow-400">
                                            <Link href="/Services">Services</Link>
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="cursor-pointer hover:text-yellow-400">
                                            <Link href="/Career">Career</Link>
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="cursor-pointer hover:text-yellow-400">
                                            <Link href="/Contact">Contact Us</Link>
                                        </motion.li>
                                    </motion.ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>




            </div>
        </header>
    )
}

export default Header
