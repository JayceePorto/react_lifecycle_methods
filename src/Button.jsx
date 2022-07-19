import React from "react";
import "./App.css";
      function Button() {
    
        function refreshPage() {
          window.location.reload(false);
        }

        return (
          <div>
            <button onClick={refreshPage}>Reload</button>
          </div>
        )
      }

  

  export default Button;