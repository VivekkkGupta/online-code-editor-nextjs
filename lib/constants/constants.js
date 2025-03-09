// AI API
export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
export const OPENAI_MODEL =
  process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o-mini";

// Project Related Consts
export const APP_NAME =
  process.env.NEXT_APP_NAME || "Codersz - AI Powered Code Editor Online";
export const APP_DESCRIPTION =
  process.env.NEXT_APP_DESCRIPTION ||
  "Online code editor and compiler for C++, Python, Javascript, Java";
export const LANGUAGES = {
  cpp: {
    name: "C++",
    helloWorld: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`,
    extension: ".cpp",
    version: "10.2.0",
  },
  python: {
    name: "Python",
    helloWorld: `print("Hello, World!")`,
    extension: ".py",
    version: "3.10.0",
  },
  javascript: {
    name: "JavaScript",
    helloWorld: `console.log("Hello, World!");`,
    extension: ".js",
    version: "18.15.0",
  },
  java: {
    name: "Java",
    helloWorld: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    extension: ".java",
    version: "15.0.2",
  },
};

// Auth Related Consts
export const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
export const GITHUB_SECRET_KEY =
  process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || "";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
export const GOOGLE_SECRET_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "";

// Mongo DB Consts
export const MONGO_DB_URI = process.env.NEXT_PUBLIC_MONGO_DB_URI || "";