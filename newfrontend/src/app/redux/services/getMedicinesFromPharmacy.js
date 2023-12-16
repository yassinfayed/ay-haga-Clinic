import axios from "axios";

// Assuming this code is within a component or function
export async function fetchMedicines() {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/medicines/getmedicines/admin"
    );

    console.log(data.data);
    return data.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching medicines:", error.message);
  }
}

export async function CheckoutToPharmacy(medicines, id) {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/cart/presc",
      {
        username: JSON.parse(localStorage.getItem("userInfo"))?.data.user
          .username,
        medicines: medicines.map((med) => med.medicine),
      }
    );

    await axios.patch(
      "http://localhost:8000/api/v1/prescriptions/update/" + id,
      {
        filled_unfilled: true,
      }
    );
    window.location.href = "http://localhost:3001/guest/login";
    return data.data;
  } catch (error) {
    // Handle errors
    console.error("Error submitting to pharmacy:", error.message);
  }
}
