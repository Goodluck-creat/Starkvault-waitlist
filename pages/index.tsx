import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
    setLoading(false);
    setEmail("");
  };

  return (
    <>
      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(63,169,245,0.3); }
          50% { box-shadow: 0 0 25px rgba(63,169,245,0.6); }
          100% { box-shadow: 0 0 10px rgba(63,169,245,0.3); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('logo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(11,42,74,0.85), rgba(0,0,0,0.85))",
          }}
        />

        {/* FLOATING ICONS */}
        {[
          { icon: "🔐", top: "15%", left: "10%" },
          { icon: "🗝️", top: "25%", right: "12%" },
          { icon: "📁", bottom: "20%", left: "15%" },
          { icon: "🛡️", bottom: "25%", right: "10%" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: "28px",
              opacity: 0.8,
              animation: "float 6s ease-in-out infinite",
              animationDelay: `${i}s`,
              ...item,
            }}
          >
            {item.icon}
          </div>
        ))}

        {/* CARD */}
        <div
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            padding: "36px",
            borderRadius: "22px",
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            color: "#fff",
            animation: "glow 4s infinite",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "6px",
            }}
          >
            StarkVault
          </h1>

          <p
            style={{
              color: "#3FA9F5",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            Decentralized Vault
          </p>

          <p
            style={{
              fontSize: "15px",
              color: "#D1D5DB",
              marginBottom: "24px",
              lineHeight: "1.6",
            }}
          >
            Military-grade encrypted document storage powered by Starknet.
          </p>

          <form onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                marginBottom: "16px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "16px",
                border: "none",
                background: "#1F6AE1",
                color: "#fff",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease",
              }}
            >
              {loading ? "Securing Spot..." : "Join Secure Wait-list"}
            </button>
          </form>

          {msg && (
            <p
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#93C5FD",
              }}
            >
              {msg}
            </p>
          )}

          <p
            style={{
              marginTop: "24px",
              fontSize: "12px",
              color: "#9CA3AF",
            }}
          >
           Encrypted • Starknet
            <br />
            Beta Access Only
          </p>
        </div>
      </div>
    </>
  );
}
