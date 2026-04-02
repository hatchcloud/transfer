import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import avatarSrc from '/avatar.png?url'

export default function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-[rgba(23,37,84,0.06)]">
      <div className="mx-auto max-w-md flex items-center justify-between h-14">
        {isHome ? (
          <button
            type="button"
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-lg font-bold text-text-strong tracking-tight">Moody's</span>
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-text-weak hover:text-text-strong cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded py-1"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-4" />
            Home
          </button>
        )}
        <button
          type="button"
          className="size-9 rounded-full overflow-hidden ring-2 ring-[rgba(23,37,84,0.08)] cursor-pointer hover:ring-[rgba(23,37,84,0.2)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border"
          onClick={() => navigate('/')}
          aria-label="Go to home"
        >
          <img
            src={avatarSrc}
            alt="Profile"
            className="size-full object-cover"
          />
        </button>
      </div>
    </header>
  )
}
