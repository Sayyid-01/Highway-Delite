import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { success, bookingId, error }: { success?: boolean; bookingId?: string; error?: string } = location.state || {};

  return (
    <div className="container mx-auto p-4 max-w-md text-center items-center">
      {success ? (
         <>
         <div className='flex items-center justify-center'>
          <img src="/success.png" alt=" success tick" className='h-48 border-collapse'/>
         </div>
          
          <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
          <p>Your booking ID is: <strong>{bookingId}</strong></p>
          <p className="mt-4">Thank you for using BookIt.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Booking Failed</h1>
          <p>{error || 'An error occurred. Please try again.'}</p>
        </>
      )}
      <Link to="/" className="mt-6 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-800">
        Back to Home
      </Link>
    </div>
  );
};

export default Result;