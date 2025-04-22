import axios from "axios";

async function getLogo(companyName: string): Promise<string | null> {
  try {
    // Make a request to Clearbit's autocomplete API
    const res = await axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
        companyName
      )}`
    );

    // Get the logo URL from the response
    const logo = res.data?.[0]?.logo;
    return logo || null;
  } catch (error) {
    // Return null if there's an error (e.g., no logo available)
    return null;
  }
}
export default getLogo;