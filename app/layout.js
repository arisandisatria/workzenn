import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-Nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Workzenn - Work smarter, land faster",
  description:
    "Workzenn helps job seekers ace interviews, craft compelling resumes, and land their dream jobs with AI-powered guidance. Simplify your job search and boost your career effortlessly.",
  keywords:
    "AI job search, resume builder, cover letter generator, interview preparation, career coach, job hunting, Workzenn",
  author: "Arisandi Satria Jeujanan",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${nunitoSans.variable} ${nunito.variable} scrollbar bg-secondary px-auto antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
