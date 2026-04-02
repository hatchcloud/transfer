import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from '@/components/home/HomePage'
import TransferForm from '@/components/transfer/TransferForm'
import ConfirmationScreen from '@/components/confirmation/ConfirmationScreen'
import SuccessScreen from '@/components/success/SuccessScreen'

export default function App() {
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<TransferForm />} />
        <Route path="/confirm" element={<ConfirmationScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
