import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Toaster } from 'sonner'
import AppHeader from '@/components/ui/app-header'
import HomePage from '@/components/home/HomePage'
import TransferForm from '@/components/transfer/TransferForm'
import ConfirmationScreen from '@/components/confirmation/ConfirmationScreen'
import SuccessScreen from '@/components/success/SuccessScreen'
import PageTransition from '@/components/ui/page-transition'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface-base">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
      <AppHeader />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/form" element={<PageTransition><TransferForm /></PageTransition>} />
          <Route path="/confirm" element={<PageTransition><ConfirmationScreen /></PageTransition>} />
          <Route path="/success" element={<PageTransition><SuccessScreen /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
