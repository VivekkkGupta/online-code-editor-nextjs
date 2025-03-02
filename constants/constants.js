export const APP_NAME = process.env.NEXT_APP_NAME || "C++ Code Editor Online";
export const APP_DESCRIPTION =
  process.env.NEXT_APP_DESCRIPTION || "Online code editor and compiler for C++";

export const LANGUAGES = {
  cpp: {
    name: "C++",
    helloWorld: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`,
    extension: ".cpp",
  },
  python: {
    name: "Python",
    helloWorld: `print("Hello, World!")`,
    extension: ".py",
  },
  javascript: {
    name: "JavaScript",
    helloWorld: `console.log("Hello, World!");`,
    extension: ".js",
  },
  java: {
    name: "Java",
    helloWorld: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    extension: ".java",
  },
};
