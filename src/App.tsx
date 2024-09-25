import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignTransaction from './pages/SignTransaction';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/sign-transaction/1" replace />} />
        <Route path="/sign-transaction/:transactionId" element={<SignTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}
