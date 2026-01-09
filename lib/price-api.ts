export interface PriceRequest {
  hotelId: string;
  checkin: string;
  checkout: string;
  adults: string;
  children: number;
  childrenAges: number[];
  discountPercentage?: string;
  currency?: string;
  customerCountryCode?: string;
}

export interface RoomOffer {
  roomName: string;
  roomId: number;
  mealPlan: string;
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  discountPercentage: string;
  baseRate: number;
  taxRate: number;
  currency: string;
  cancellationPolicy: string;
  image: string;
  photos?: string[]
}

export interface PriceResponseData {
  hotelId: string;
  hotelName: string;
  checkin: string;
  checkout: string;
  adults: string;
  children: string;
  childrenAges: number[];
  currency: string;
  offers: RoomOffer[];
}

export interface PriceResponse {
  success: boolean;
  data?: PriceResponseData;
  error?: string;
}

// const BASE_API_URL = "http://localhost:3001/api";
const BASE_API_URL = "https://test1.helaltrip.com/api";

const HOTEL_DETAILS_API_URL = `${BASE_API_URL}/hotel-info`;
const PRICE_API_URL = `${BASE_API_URL}/hotel-prices`;

export async function fetchHotelPrice(request: PriceRequest): Promise<PriceResponse> {
  try {
    const response = await fetch(PRICE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // API returns {success: boolean, data: {...}}
    if (data.success && data.data) {
      return data;
    }
    
    // If it's an array (old format), take first element
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching hotel price:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function fetchHotelDetails(hotelId: string): Promise<{ data: any | null, error: string | null }> {
  try {
    const response = await fetch(`${HOTEL_DETAILS_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hotelId }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return { 
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}