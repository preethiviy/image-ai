import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Modals } from "@/components/modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  	title: "Image Ai",
  	description: "Canva like app",
};

export default async function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body className={inter.className}>
					<Providers>
						<Toaster />
						<Modals />
						{children}
					</Providers>
				</body>
			</html>
		</SessionProvider>
	);
}
