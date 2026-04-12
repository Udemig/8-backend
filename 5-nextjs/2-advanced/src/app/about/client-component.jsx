"use client";

import { useState } from "react";

const ClientComponent = ({ children }) => {
  const [name, setName] = useState("");

  return (
    <div className="client">
      <h1>ClientComponent: {name}</h1>

      <input onChange={(e) => setName(e.target.value)} type="text" />

      {children}
    </div>
  );
};

export default ClientComponent;
