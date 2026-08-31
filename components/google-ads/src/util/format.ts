export const formatAccountNumber = (accountNumber: string): string => {
  try {
    const reg = /^(\d{3})(\d{3})(\d{4})$/;
    const match = reg.exec(accountNumber);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  } catch {
    return accountNumber;
  }
  return accountNumber;
};
