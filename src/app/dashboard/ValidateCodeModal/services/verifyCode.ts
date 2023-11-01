import APICaller from "../../../../utils/apiCaller";

export async function verifyCode(donation_code: string) {
  const obj = { donation_code: donation_code };

  const response = await APICaller("/api/verify_code", "POST", obj);

  return response;
}
