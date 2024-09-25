/**
 * Represents an error structure returned by MetaMask. This interface provides detailed
 * information about errors encountered during MetaMask interactions.
 *
 * @param message - The human-readable error message describing what went wrong.
 * @param code - The numeric error code indicating the type of error.
 * @param stack - A string representing the stack trace at the point the error was thrown.
 * @param data - Additional data about the error, potentially including an original error object.
 */
export interface MetamaskError {
  message: string;
  code: number;
  stack: string;
  data: {
    originalError: {
      message: string;
      stack: string;
    };
  };
}
