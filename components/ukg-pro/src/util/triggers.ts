import * as crypto from "node:crypto";








export const isValidHmacSignature = (
  payload: string,
  signature: string,
  secret: string,
): boolean => {
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    
    return false;
  }
};
