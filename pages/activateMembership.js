import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../firebase";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { isMembershipActive } from "../config/utils";

export default function ActivateMembership() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoActivating, setAutoActivating] = useState(true);
  const [message, setMessage] = useState("🔄 Activating membership...");
  const [error, setError] = useState("");

  useEffect(() => {
    const isActive = isMembershipActive();
    if (isActive) {
      router.push("/");
      return;
    }

    const { email: queryEmail, code: queryCode } = router.query;

    if (queryEmail && queryCode) {
      setEmail(queryEmail);
      setActivationCode(queryCode);
      activateMembership(queryEmail, queryCode, true);
    } else {
      setAutoActivating(false);
    }
  }, [router.query]);

  const activateMembership = async (email, code, isAuto = false) => {
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "memberships"),
        where("email", "==", email),
        where("activationCode", "==", code)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ Invalid email or activation code.");
        setMessage("");
        setAutoActivating(false);
        setLoading(false);
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const now = new Date();
      const expiry = new Date(data.expiryDate);

      if (now > expiry) {
        setError("❌ Your membership has expired. Please purchase again.");
        setMessage("");
        setAutoActivating(false);
        setLoading(false);
        return;
      }

      setCookie("Membership", "true", { expires: expiry });
      setCookie("MemberEmail", data.email, { expires: expiry });
      setCookie("MemberName", data.name || "", { expires: expiry });
      setCookie("MembershipExpires", expiry.toISOString(), { expires: expiry });

      setMessage("✅ Membership activated successfully.");
      if (!isAuto) alert("✅ Your membership is successfully activated.");
      router.reload();
    } catch (err) {
      console.error("Activation error:", err);
      setError("⚠️ An error occurred. Please try again later.");
      setMessage("");
      setAutoActivating(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    activateMembership(email, activationCode);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-slate-200 mb-4">
          Activate Membership
        </h1>

        {/* Spinner */}
        {autoActivating && (
          <div className="text-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-400 mx-auto mb-2"></div>
            <p className="text-slate-300 font-medium">{message}</p>
          </div>
        )}

        {/* Form */}
        {!autoActivating && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-700 text-white p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Activation Code</label>
              <input
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-700 text-white p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded font-semibold transition ${
                loading
                  ? "bg-neutral-600 cursor-not-allowed"
                  : "bg-neutral-700 hover:bg-neutral-600"
              } text-white`}
            >
              {loading ? "Activating..." : "Activate"}
            </button>
          </form>
        )}

        {/* Membership expired link */}
        {!autoActivating &&
          error === "❌ Your membership has expired. Please purchase again." && (
            <div className="text-center mt-4">
              <p className="text-sm text-slate-300">Need a new membership?</p>
              <Link href="/membership" className="text-slate-200 underline hover:text-slate-100">
                Go to Membership Page
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}
