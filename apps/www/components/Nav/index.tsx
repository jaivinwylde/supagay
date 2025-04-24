import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link href="/">
          <img src="/images/supagay-logo.svg" alt="Supagay" width="124" height="24" />
        </Link>
      </div>
      
      <div className="nav-links">
        <Link href="/docs" className={router.pathname.startsWith('/docs') ? 'active' : ''}>
          Documentation
        </Link>
        <Link href="/pricing" className={router.pathname === '/pricing' ? 'active' : ''}>
          Pricing
        </Link>
        <Link href="/blog" className={router.pathname.startsWith('/blog') ? 'active' : ''}>
          Blog
        </Link>
        <Link href="https://github.com/jaivinwylde/supagay">
          GitHub
        </Link>
      </div>
      
      <div className="nav-actions">
        <Link href="https://supagay.com/dashboard">
          <button className="button-primary">Dashboard</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation