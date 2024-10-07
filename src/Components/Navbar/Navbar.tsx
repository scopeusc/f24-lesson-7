import React from 'react'
import styles from "./navbar.module.css"
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import AuthLinks from '../AuthLinks/AuthLinks'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Blog</div>
        <div className={styles.links}>
        <ThemeToggle />
        <AuthLinks />
        </div>
    </div>
  )
}

export default Navbar;