import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader-overlay ${!loading ? "hidden" : ""}`}>
      <div className="preloader-spinner"></div>
    </div>
  );
}
