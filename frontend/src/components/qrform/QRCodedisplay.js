import React from "react";
import "../qrcode/qr.css"
function QRCodeDisplay({ qrSrc }) {
    return qrSrc ? (
      <div className="qr-code">
        <img src={qrSrc} alt="qr-code" />
      </div>
    ) : null;
  }

  export default QRCodeDisplay;