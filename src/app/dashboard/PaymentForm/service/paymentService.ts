export async function postToDonationRegisterApi(value: number) {
  const apiUrl = "/api/donation_register";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: value }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.status;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
