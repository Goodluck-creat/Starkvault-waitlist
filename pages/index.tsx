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
        }

        .bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top right, #3b0a45, #05010a 60%);
          color: #fff;
          font-family: Inter, Arial, sans-serif;
          padding: 20px;
        }

        .container {
          max-width: 520px;
          width: 100%;
          text-align: center;
        }

        .star {
          font-size: 22px;
          margin-bottom: 20px;
          opacity: 0.9;
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
          backdrop-filter: blur(10px);
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

        .socials {
          margin-top: 48px;
          display: flex;
          justify-content: center;
          gap: 18px;
          opacity: 0.7;
        }

        .socials span {
          cursor: pointer;
          font-size: 18px;
          transition: opacity 0.2s ease;
        }

        .socials span:hover {
          opacity: 1;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 34px;
          }

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
        <div className="container">
          <div className="star">✦</div>

          <h1>Coming Soon</h1>

          <p className="subtitle">
            StarkVault is building a secure, decentralized vault for encrypted
            document storage on Starknet. Be the first to know when we launch.
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

          <div className="socials">
            <span>in</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>🌐</span>
          </div>
        </div>
      </div>
    </>
  );
}
