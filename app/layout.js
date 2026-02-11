import "./globals.css";

export const metadata = {
  title: "SwePad",
  description: "Premium mousepads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
