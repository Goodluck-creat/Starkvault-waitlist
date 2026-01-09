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
      <style>{`
        body {
          margin: 0;
          background: #05010a;
        }

        .bg {
          min-height: 100vh;
          background: radial-gradient(circle at top right, #3b0a45, #05010a 65%);
          color: #fff;
          font-family: Inter, Arial, sans-serif;
          padding: 40px 20px;
          overflow-x: hidden;
        }

        /* FLOATING BACKGROUND ICONS */
        .float {
          position: absolute;
          color: rgba(255,255,255,0.08);
          animation: float 10s ease-in-out infinite;
        }

        .float.one { top: 15%; left: 10%; font-size: 28px; }
        .float.two { top: 60%; right: 12%; font-size: 22px; animation-delay: 3s; }
        .float.three { bottom: 20%; left: 20%; font-size: 18px; animation-delay: 6s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .container {
          max-width: 520px;
          margin: 0 auto;
          text-align: center;
          animation: fadeUp 1s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .star {
          font-size: 22px;
          margin-bottom: 20px;
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        h1 {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .subtitle {
          color: #b6b6c9;
          font-size: 15px;
          margin-bottom: 36px;
          line-height: 1.6;
        }

        form {
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 6px;
          backdrop-filter: blur(12px);
        }

        input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 14px;
          color: white;
          font-size: 14px;
          outline: none;
        }

        input::placeholder {
          color: #9ca3af;
        }

        button {
          background: white;
          color: black;
          border: none;
          padding: 0 22px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        button:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .msg {
          margin-top: 16px;
          font-size: 14px;
          color: #a5b4fc;
        }

        /* ABOUT SECTION */
        .about {
          max-width: 760px;
          margin: 120px auto 0;
          text-align: center;
          animation: fadeUp 1.2s ease forwards;
        }

        .about h2 {
          font-size: 32px;
          margin-bottom: 18px;
        }

        .about p {
          color: #c7c7da;
          line-height: 1.7;
          font-size: 16px;
        }

        /* IMAGE BANNER */
.banner {
  margin-top: 100px;
  height: 300px;
  position: relative;
  background: url("/control.jpg") center / cover no-repeat;
  border-radius: 18px;
  overflow: hidden;
}

/* Subtle overlay */
.banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35); /* slight dark overlay */
}

        
         
       

        .banner-text {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 0.5px;
          animation: glow 4s ease-in-out infinite;
        }

        /* X ICON */
        .x {
          margin-top: 80px;
          display: flex;
          justify-content: center;
          opacity: 0.7;
        }

        .x a {
          color: white;
          font-size: 20px;
          transition: opacity 0.2s ease;
        }

        .x a:hover {
          opacity: 1;
        }

        @media (max-width: 480px) {
          h1 { font-size: 34px; }
          .banner-text { font-size: 24px; }
          form {
            flex-direction: column;
            gap: 10px;
          }
          button {
            width: 100%;
            padding: 14px;
          }
        }
      `}</style>

      <div className="bg">
        {/* Floating vault vibes */}
        <div className="float one">🔒</div>
        <div className="float two">📄</div>
        <div className="float three">⛓️</div>

        {/* HERO */}
        <div className="container">
          <div className="star">✦</div>
          <h1>Coming Soon</h1>

          <p className="subtitle">
            StarkVault is building a secure, decentralized vault for encrypted
            document storage on StarkNet. Be the first to know when we launch.
          </p>

          <form onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <button disabled={loading}>
              {loading ? "Please wait..." : "Notify Me"}
            </button>
          </form>

          {msg && <div className="msg">{msg}</div>}
        </div>

        {/* ABOUT US */}
        <div className="about">
          <h2>About Starkvault</h2>
          <p>
            Starkvault is a decentralized platform built on the StarkNet
            blockchain ecosystem that enables users to upload, store, verify,
            and mint documents as NFTs for proof and authenticity. It is the
            first of its kind in the Web3 ecosystem, seamlessly combining the
            familiar user experience of Web2 with the security and
            decentralization of Web3.
          </p>
        </div>

        {/* BANNER */}
        <div className="banner">
          <div className="banner-text">Control over your data</div>
        </div>

        {/* X ONLY */}
        <div className="x">
          <a
            href="https://x.com/starkvault"
            target="_blank"
            rel="noopener noreferrer"
          >
            𝕏
          </a>
        </div>
      </div>
    </>
  );
}
