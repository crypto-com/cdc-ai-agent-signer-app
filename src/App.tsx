import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import SwapToken from './pages/SwapToken';
import SignTransaction from './pages/SignTransaction';
import WrapToken from './pages/WrapToken';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/sign-transaction/1" replace />} />
        <Route path="/sign-transaction/:id" element={<SignTransaction />} />
        <Route path="/wrap-token/:id" element={<WrapToken />} />
        <Route path="/swap-token/:id" element={<SwapToken />} />
      </Routes>
    </BrowserRouter>
  );
}
