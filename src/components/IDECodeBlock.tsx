// Async Server Component — tokenizes both code strings on the server,
// passes serialized plain-object tokens to IDEWindow (client).
import { codeToTokens, type ThemedToken } from "shiki";
import IDEWindow, { type SerToken } from "./IDEWindow";

// Custom vibrant theme — Tokyo Night-inspired with boosted saturation.
// Uses the same TextMate scopes as VS Code so every token maps precisely.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VIBRANT_THEME: any = {
  name: "portfolio-vibrant",
  type: "dark",
  colors: {
    "editor.background": "#0d0b14",
    "editor.foreground": "#a9b1d6",
  },
  tokenColors: [
    {
      // Comments — very muted so they fade into the background
      scope: ["comment", "comment.line", "comment.block"],
      settings: { foreground: "#4a4a6a", fontStyle: "italic" },
    },
    {
      // Keywords: class, return, const, let — and `this` (language variable)
      scope: [
        "keyword",
        "keyword.control",
        "storage.type",
        "storage.modifier",
        "variable.language.this",
        "variable.language.super",
      ],
      settings: { foreground: "#c792ea" },
    },
    {
      // Class name + all method / function names
      scope: [
        "entity.name.class",
        "entity.name.type.class",
        "entity.name.function",
        "meta.definition.method entity.name.function",
        "support.function",
      ],
      settings: { foreground: "#ffcb6b" },
    },
    {
      // Property access: this.name, this.location, etc.
      scope: [
        "variable.other.property",
        "meta.property.object",
        "support.variable.property",
        "variable.other.object.property",
      ],
      settings: { foreground: "#f07178" },
    },
    {
      // All string literals (values AND object-key strings)
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#c3e88d" },
    },
    {
      // Numeric literals / timestamps
      scope: ["constant.numeric"],
      settings: { foreground: "#f78c6c" },
    },
    {
      // Punctuation — brackets, braces, dots, commas
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#89ddff" },
    },
  ],
};

const PROFILE_CODE = `class Shiin {
  // I build, because I can.
  // My skill set is continuously expanding.

  constructor() {
    this.name     = 'Shiin (Ken Narzabal)'
    this.location = 'Tayabas City, Quezon'
    this.email    = 'kenlawrencenarz@gmail.com'
    this.phone    = '+63 XXX XXX XXXX'
  }

  workExperience() {
    return [
      { '2024–now': 'Lead Author — GSO-RMS Thesis' },
      { '2023–now': 'Freelance Full-Stack Developer' },
      { '2022–now': 'Co-founder — TimeLens VR (4× Best Startup)' },
    ]
  }

  skills() {
    return [
      // frontend
      'React', 'TypeScript', 'Next.js',
      'Tailwind CSS', 'Vite', 'HTML/CSS/JS',
      // backend & mobile
      'PHP', 'MySQL', 'Node.js', 'Python',
      'REST APIs', 'React Native', 'Capacitor',
      // tools & design
      'Git', 'Figma', 'Photoshop',
      'UI/UX Design', 'Responsive Design', 'Data Visualization',▋
    ]
  }
}`;

const CREDENTIALS_CODE = `// Credentials.ts — extends the core profile
class Shiin extends Profile {

  certifications() {
    return [
      // Networking & Infrastructure
      { issuer: 'Cisco Networking Academy',
        title:  'Introduction to Networks',
        year:    2023 },
      { issuer: 'Cisco Networking Academy',
        title:  'Network Addressing & Troubleshooting',
        year:    2023 },

      // Development & Design
      { issuer: 'freeCodeCamp',
        title:  'Responsive Web Design',
        year:    2022 },
      { issuer: 'Google',
        title:  'Foundations of UX Design',
        year:    2023 },
    ]
  }

  achievements() {
    return [
      // Academic Excellence
      { title:  "CCT Dean's Lister",
        org:    'STI College',
        period: '2022–2025' },

      // Research & Authorship
      { title:  'Lead Author — GSO-RMS Thesis',
        org:    'STI College',
        year:    2024 },

      // Entrepreneurship
      { title:  'Co-founder — TimeLens VR',
        award:  '4× Best Startup Award',
        period: '2022–now' },▋
    ]
  }
}`;

function serialize(lines: ThemedToken[][]): SerToken[][] {
  return lines.map((line) =>
    line.map((t) => ({
      content: t.content,
      color: t.color,
      italic: !!(t.fontStyle && t.fontStyle & 1),
      bold: !!(t.fontStyle && t.fontStyle & 2),
    }))
  );
}

export default async function IDECodeBlock() {
  const [profile, credentials] = await Promise.all([
    codeToTokens(PROFILE_CODE,      { lang: "javascript", theme: VIBRANT_THEME }),
    codeToTokens(CREDENTIALS_CODE,  { lang: "typescript", theme: VIBRANT_THEME }),
  ]);

  return (
    <IDEWindow
      profileTokens={serialize(profile.tokens)}
      credentialsTokens={serialize(credentials.tokens)}
    />
  );
}
