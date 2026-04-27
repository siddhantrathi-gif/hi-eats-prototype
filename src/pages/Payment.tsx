import { useState } from "react";

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate processing for 2 seconds, then reset
    setTimeout(() => {
      setProcessing(false);
      alert("This is a demo payment page. No actual payment will be processed!");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 px-6 py-16 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1.5 text-sm font-medium text-orange-700">
            💳 Secure Payment
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Unlock unlimited recipe generation
          </h1>

          <p className="mt-4 text-lg text-stone-600">
            One simple payment gives you unlimited access to personalized recipes
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Payment Form */}
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-lg">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <p className="mt-1 text-sm text-stone-600">Complete your purchase securely</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                    Cardholder Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="card" className="block text-sm font-medium text-stone-700">
                    Card Number
                  </label>
                  <input
                    id="card"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-stone-700">
                      Expiry Date
                    </label>
                    <input
                      id="expiry"
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-stone-700">
                      CVC
                    </label>
                    <input
                      id="cvc"
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-semibold text-stone-900">$3.00</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-2 text-lg">
                    <span className="font-bold text-stone-900">Total</span>
                    <span className="font-bold text-emerald-700">$3.00</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                  {processing ? "Processing..." : "Pay $3.00 💳"}
                </button>

                <p className="text-center text-xs text-stone-500">
                  🔒 Secured by Stripe • Your payment info is encrypted
                </p>
              </form>
            </div>

            <p className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-center text-sm text-orange-800">
              <strong>Demo Mode:</strong> This is a preview. No actual charges will be made.
            </p>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-lg">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">Unlimited Access</h3>
                    <p className="text-sm text-emerald-700">One-time payment</p>
                  </div>
                  <p className="text-3xl font-bold text-emerald-900">$3</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-stone-900">What's included:</h3>

                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-medium text-stone-900">Unlimited recipe generation</p>
                    <p className="text-sm text-stone-600">
                      Create as many personalized recipes as you need
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🥗</span>
                  <div>
                    <p className="font-medium text-stone-900">Ingredient-based recommendations</p>
                    <p className="text-sm text-stone-600">
                      Smart recipes based on what you have
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-stone-900">Nutrition insights</p>
                    <p className="text-sm text-stone-600">
                      Detailed macros, calories, and health info
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="font-medium text-stone-900">Quick meal ideas</p>
                    <p className="text-sm text-stone-600">
                      Filter by time, budget, and equipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">💾</span>
                  <div>
                    <p className="font-medium text-stone-900">Save your favorites</p>
                    <p className="text-sm text-stone-600">
                      Build your personal recipe collection
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="font-semibold text-emerald-900">💡 After payment:</h3>
              <ul className="mt-3 space-y-2 text-sm text-emerald-800">
                <li className="flex items-start gap-2">
                  <span>1️⃣</span>
                  <span>Instant account upgrade to unlimited access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>2️⃣</span>
                  <span>Start generating recipes immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>3️⃣</span>
                  <span>No subscription, no hidden fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>4️⃣</span>
                  <span>Lifetime unlimited recipe discovery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}