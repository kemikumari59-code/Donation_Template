document.addEventListener("DOMContentLoaded", () => {

  const amtButtons = document.querySelectorAll(".amt-btn");
  const customAmountInput = document.getElementById("customAmount");
  const donationForm = document.getElementById("donation-form");

  let selectedAmount = null;

  // Amount selection
  amtButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      amtButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const amt = btn.getAttribute("data-amount");
      if (amt) {
        selectedAmount = Number(amt);
        customAmountInput.value = amt;
      } else {
        customAmountInput.value = "";
        customAmountInput.focus();
        selectedAmount = null;
      }
    });
  });

  // Form submit → Payment
  donationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = selectedAmount || Number(customAmountInput.value);
    const cause = document.getElementById("cause").value;
    const country = document.getElementById("Country").value;

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
    if (!cause) {
      alert("Please choose a cause");
      return;
    }
    if (!country) {
      alert("Please choose a country");
      return;
    }

    try {
      // 1️⃣ Create order from backend
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });

      const order = await res.json();

      if (!order.id) {
        alert("Order creation failed");
        return;
      }

      // 2️⃣ Razorpay Checkout
      const options = {
        key: "rzp_test_S00qcNrhzyoknq", // 🔴 YOUR PUBLIC TEST KEY
        amount: order.amount,
        currency: "INR",
        name: "Navprayas",
        description: "Donation",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment success:", response);

          // 3️⃣ Verify payment
          await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          });

          alert("Thank you for your donation!");
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  });

});
