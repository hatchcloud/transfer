import { Routes, Route, Navigate } from 'react-router-dom'
import TransferForm from '@/components/transfer/TransferForm'
import ConfirmationScreen from '@/components/confirmation/ConfirmationScreen'
import SuccessScreen from '@/components/success/SuccessScreen'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/form" element={<TransferForm />} />
        <Route path="/confirm" element={<ConfirmationScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="*" element={<Navigate to="/form" replace />} />
      </Routes>
    </div>
  )
}
