import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";


interface Slot {
  date: string;
  time: string;
  available: boolean;
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  slots: Slot[];
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    experience,
    selectedSlot,
    quantity = 1,
  }: { experience: Experience; selectedSlot: Slot; quantity?: number } =
    location.state || {};

  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [agree, setAgree] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState<{ valid: boolean; discount?: number } | null>(null);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!experience || !selectedSlot)
    return (
      <div className="text-center text-gray-700">
        Invalid access. Go back to{" "}
        <a href="/" className="text-yellow-500 underline">
          Home
        </a>
        .
      </div>
    );

  const price = experience.price;
  const subtotal = price * quantity;
  const taxes = Math.round(subtotal * 0.05);

  // CALCULATE DISCOUNT AND TOTAL WITH PROMO CODE
  let discount = 0;
  if (promoValid?.valid) {
    discount = promoValid.discount! > 1 ? promoValid.discount : subtotal * promoValid.discount!;  
  }
  const total = subtotal + taxes - discount;

  const handlePromoApply = async () => {
    if (!promoCode.trim()) return;  // Don't call if empty
    try {
      const res = await axios.post("https://highway-delite-backend-g070.onrender.com/api/promo/validate", { code: promoCode });
      setPromoValid(res.data);  
    } catch (err) {
      setPromoValid({ valid: false });
    }
  };

  //HANDLE BOOKING
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return toast.error("Please agree to the terms and policy first.");

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://highway-delite-backend-g070.onrender.com/api/bookings", {
        experienceId: experience._id,
        user,
        slot: selectedSlot,
        promoCode: promoValid?.valid ? promoCode : '', 
        totalPrice: total,
      });

      navigate("/result", {
        state: {
          success: true,
          bookingId: res.data.bookingId,
        },
      });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // FORMATED DATE FOR DISPLAY (MM/DD)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 max-w-6xl">
        {/* LEFT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-yellow-400"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-yellow-400"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-yellow-400"
              placeholder="Your phone"
              required
            />
          </div>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1 border rounded-md p-2"
            />
            <button
              type="button"
              onClick={handlePromoApply}  // Added handler
              className="bg-black text-white px-5 rounded-md hover:bg-gray-800"
            >
              Apply
            </button>
          </div>
          {promoValid && (
            <p className={`text-sm mb-4 ${promoValid.valid ? 'text-green-600' : 'text-red-600'}`}>
              {promoValid.valid ? 'Promo code applied!' : 'Invalid promo code'}
            </p>
          )}

          <div className="flex items-center mt-4">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree to the <span className="underline">terms</span> and{" "}
              <span className="underline">safety policy</span>.
            </label>
          </div>

          {error && <p className="text-red-500 mt-4">{toast.error(error)}</p>}
        </form>

        {/* RIGHT SUMMARY CARD */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Experience</span>
              <span className="font-medium">{experience.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{formatDate(selectedSlot.date)}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{selectedSlot.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{quantity}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-400 text-black font-medium py-3 rounded-md hover:bg-yellow-500 transition"
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
