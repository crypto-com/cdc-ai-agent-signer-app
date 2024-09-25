import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, UseTransactionDetails } from '../types/global.interfaces';

/**
 * Custom hook to extract and validate transaction details from the URL query params.
 * It decodes a JWT from the URL, checks its validity, and sets the transaction details.
 *
 * @return {UseTransactionDetails} Contains transaction details, error message if any, and processing state.
 */
export const useTransactionDetails = (): UseTransactionDetails => {
  const location = useLocation();
  const [transactionDetails, setTransactionDetails] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      setError('Token is missing from the URL.');
      setIsProcessing(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        setError('The link has expired. Please request a new one.');
        setIsProcessing(false);
        return;
      }

      setTransactionDetails(decoded);
      setIsProcessing(false);
    } catch (e) {
      setError('Invalid or expired token.');
      setIsProcessing(false);
    }
  }, [location.search]);

  return { transactionDetails, error, isProcessing, setError };
};
