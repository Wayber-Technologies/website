export const metadata = {
  title: "Wayber Technologies - Digital Agency & Web Development Services",
  description:
    "Wayber Technologies is a leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. We help businesses transform their digital presence with innovative solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
