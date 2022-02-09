import React, { useState } from "react";
import './square.css'
function Square() {
  const [state, setState] = useState(null);

  return <button>{state}</button>;
}

export default Square;
