import Link from "next/link";
import styles from "./Header.module.css";

// Shared header displayed on both pages.
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link href="/" className={styles.title}>
                    Weather Search
                </Link>

                {/* Links to the two app routes. */}
                <nav className={styles.nav} aria-label="Main navigation">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}

