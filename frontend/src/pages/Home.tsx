import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

interface Experience {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  location?: string;  // Optional, since backend doesn't have it
  price: number;
}

interface HomeProps {
  searchQuery: string;
}

const Home = ({ searchQuery }: HomeProps) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://highway-delite-backend-g070.onrender.com/api/experiences")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error("Error fetching experiences:", err))
      .finally(() => setLoading(false));
  }, []);

  // FILTER EXPERIENCES BASED ON SEARCH
  const filteredExperiences = experiences.filter(exp =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Experiences
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-white shadow-md rounded-lg h-full  overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-grey-100 text-black z-10 text-xs px-2 py-1 rounded-full border">
                {exp.title.split(" ")[0]}
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {exp.title}
                </h2>
                
                <p className="text-sm text-gray-600 mt-1">
                  {exp.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-base font-medium text-gray-900">
                  From <span className="font-semibold">₹{exp.price}</span>
                </p>
                <Link
                  to={`/details/${exp._id}`}
                  className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded font-medium hover:bg-yellow-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredExperiences.length === 0 && searchQuery && (
        <p className="text-center text-gray-500 mt-6">No experiences found for "{searchQuery}".</p>
      )}
    </div>
  );
};

export default Home;