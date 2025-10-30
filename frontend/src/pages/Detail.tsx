import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

interface Slot {
  date: string;
  time: string;
  available: boolean;
  slotsLeft: number;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data: experience, loading, error } = useApi(`/experiences/${id}`);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error || !experience)
    return <div className="text-center text-red-500">Error loading experience.</div>;

 const handleBook = () => {
  if (!selectedTime) return;

  navigate("/checkout", {
    state: {
      experience,
      selectedSlot: selectedTime,
      quantity, 
    },
  });
};

  const price = experience.price;
  const subtotal = price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  //FORATTING DATE FOR DISPLAY (Oct 22)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-10 max-w-6xl">
      {/* LEFT SIDE */}
      <div className="md:col-span-2">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
        <p className="text-gray-600 mb-6">{experience.description}</p>

        {/* DATE SELECTION */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Choose Date</h2>
          <div className="flex flex-wrap gap-3">
            {[...new Set(experience.slots.map((s: Slot) => s.date))].map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`px-4 py-2 rounded border ${
                  selectedDate === date
                    ? "bg-orange-400 text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* TIME SELECTION */}
        {selectedDate && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Choose Time</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {experience.slots
                .filter((s: Slot) => s.date === selectedDate)
                .map((slot: Slot, i: number) => (
                  <button
                    key={i}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot)}
                    className={` py-2 text-sm rounded border relative ${
                      !slot.available
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : selectedTime?.time === slot.time
                        ? "bg-orange-400 text-white"
                        : "border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    {slot.time}
                    <span className=" ml-2 text-xs mt-1 text-red-500">
                      {slot.available
                        ? `${slot.slotsLeft} left`
                        : "Sold out"}
                    </span>
                  </button>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All times are in IST (GMT +5:30)
            </p>
          </div>
        )}

        {/* ABOUT */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">About</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
            Certified guide and full safety gear included.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (PRICE CARD) */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-md h-fit">
        <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Starts at</span>
          <span>₹{price}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span>Quantity</span>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-3 mb-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleBook}
          disabled={!selectedTime}
          className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Details;
