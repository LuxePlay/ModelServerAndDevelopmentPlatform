import { QRCodeSVG as QRCode } from 'qrcode.react';

const QRCodeGenerator = ({ value, size }: { value: string; size: number }) => {
  return (
    <div className="qrcode-container">
      <QRCode value={value} size={size} />
    </div>
  );
};

export default QRCodeGenerator;