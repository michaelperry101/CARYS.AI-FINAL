import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";

const emailServer = process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER
  ? {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 587),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    }
  : null;

// Fallback server so build/runtime won't crash if not configured.
const fallbackServer = {
  host: "localhost",
  port: 587,
  secure: false,
  auth: { user: "user", pass: "pass" }
};

const transporter = emailServer
  ? nodemailer.createTransport(emailServer)
  : null;

export const authOptions = {
  providers: [
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      : null,
    EmailProvider({
      server: emailServer || fallbackServer,
      from: process.env.EMAIL_FROM || "Carys <no-reply@example.com>",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        if (!transporter) {
          console.warn("Email transport not configured. Verification link:", url);
          return;
        }
        const { host } = new URL(url);
        await transporter.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to Carys`,
          text: `Sign in to Carys\n${url}\n\n`,
          html: `<p>Sign in to <strong>Carys</strong></p><p><a href="${url}">Click here to sign in</a></p><p>${host}</p>`
        });
      }
    })
  ].filter(Boolean),
  pages: {
    signIn: "/login"
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
};
