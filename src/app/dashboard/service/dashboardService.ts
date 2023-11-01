"use client";
import { DonationStatus } from "@prisma/client";
import APICaller from "../../../utils/apiCaller";
import { UserType } from "@/enums/userType";

export async function donationRequest(userType: UserType) {
  try {
    const response = await APICaller(
      `/api/donation_info/${getUserRoute(userType)}`,
      "GET"
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function getUserRoute(userType: UserType) {
  if (userType === UserType.DONOR_PF || userType === UserType.DONOR_PJ) {
    return "donor";
  }
  return userType.toLowerCase();
}

export async function updateDonationStatus(
  id: string,
  donation_status: DonationStatus
) {
  try {
    const response = await APICaller(`/api/donation_status/${id}`, "POST", {
      donation_status,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}