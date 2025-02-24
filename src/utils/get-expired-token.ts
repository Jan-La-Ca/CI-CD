import ms from 'ms'; // Import the default export

export function getTokenExpirationDate(expired: string): Date {
  const expiresInMilliseconds = ms(expired);
  if (!expiresInMilliseconds) {
      throw new Error(`Invalid expiration string: ${expired}`);
  }

  const expirationDate = new Date(Date.now() + expiresInMilliseconds);
  return expirationDate;
}