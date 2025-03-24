import axios, { AxiosResponse } from "axios";

// Define types for the fact-check results from the backend
interface FactCheck {
  publisher: string;
  url: string;
  title: string;
  rating: string;
}

interface FactCheckResult {
  text: string;
  claimant: string | null;
  claimDate: string | null;
  factCheck: FactCheck[];
}

interface FactCheckResponse {
  message: string;
  results?: FactCheckResult[];
  checkWorthyClaims?: string[];
}

// Define the type expected by ResultCard
interface VerificationResult {
  label: string;
  confidence: number;
  source: string;
  image: string;
  url?: string;
}

// Define the type for contact form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  message: string;
}

export const verifyNews = async (text: string): Promise<VerificationResult> => {
  if (!text || !text.trim()) {
    throw new Error("Please provide a valid claim to verify.");
  }

  try {
    const response: AxiosResponse<FactCheckResponse> = await axios.post(
      "http://localhost:5000/api/fact-check",
      { query: text }
    );

    const { results, checkWorthyClaims } = response.data;

    if (results && results.length > 0) {
      const result = results[0];
      const factCheck = result.factCheck[0] || {};
      return {
        label: factCheck.rating || "Unknown",
        confidence: factCheck.rating === "False" ? 0.95 : 0.5,
        source: factCheck.publisher || "Unknown",
        image: "https://via.placeholder.com/150",
        url: factCheck.url,
      };
    } else if (checkWorthyClaims && checkWorthyClaims.length > 0) {
      return {
        label: "Check-Worthy",
        confidence: 0.7,
        source: "ClaimBuster",
        image: "https://via.placeholder.com/150",
      };
    } else {
      throw new Error(
        "No fact-checks or check-worthy claims found for this query."
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Failed to verify news";
      if (status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else if (message.includes("Fact Check Tools API has not been used")) {
        throw new Error(
          "Google Fact Check API is not enabled. Please contact the administrator."
        );
      } else if (status === 400) {
        throw new Error("Invalid request. Please provide a valid claim.");
      } else {
        throw new Error(message);
      }
    } else {
      throw new Error(
        "Unable to connect to the server. Please check your network connection."
      );
    }
  }
};

export const submitContact = async (data: ContactFormData): Promise<void> => {
  try {
    const response: AxiosResponse<ContactResponse> = await axios.post(
      "http://localhost:5000/api/contact",
      data
    );
    if (response.data.message !== "Message sent successfully") {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to send message"
    );
  }
};
