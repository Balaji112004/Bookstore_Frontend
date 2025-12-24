function PaymentFailure() {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed!</h1>
        <p>Try again or contact support.</p>
        <button onClick={() => window.location.href = "/cart"} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded">
          Back to Cart
        </button>
      </div>
    );
  }
  export default PaymentFailure;
  