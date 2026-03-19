module.exports = {
  role: "Frontend Developer",

  sections: [

    // ========================= WEB FUNDAMENTALS =========================
    {
      title: "Core Web Fundamentals",

      skills: [
        {
          topic: "HTML5 & Accessibility",
          levels: [
            {
              name: "Semantic Web & a11y",
              explanation: "Writing strict, accessible markup that screen readers and search engines can parse perfectly.",
              keyIdeas: [
                "Semantic Tags (<article>, <nav>, <main>)",
                "WAI-ARIA Roles & Attributes",
                "Forms & Input Validation"
              ],
              patterns: [
                "Keyboard Navigation focus-trapping",
                "SEO-friendly structuring"
              ],
              example: "Build an accessible modal dialog.",
              problems: [],
              tips: ["Accessibility (a11y) is heavily tested in Senior UI interviews."]
            }
          ]
        },
        {
          topic: "Modern CSS & Layouts",
          levels: [
            {
              name: "Responsive Design",
              explanation: "Mastering how elements flow, position, and stack on the web.",
              keyIdeas: [
                "Flexbox & CSS Grid",
                "CSS Variables & Preprocessors (SASS)",
                "Media Queries & Mobile-First"
              ],
              patterns: [
                "Holy Grail Layout",
                "Z-Index Stacking Contexts"
              ],
              example: "Center a div both vertically and horizontally.",
              problems: [],
              tips: ["Flexbox handles 1D layouts; Grid handles 2D block layouts."]
            }
          ]
        }
      ]
    },

    // ========================= JAVASCRIPT MASTERY =========================
    {
      title: "JavaScript Deep Dive",

      skills: [
        {
          topic: "Core JavaScript (ES6+)",
          levels: [
            {
              name: "Language Fundamentals",
              explanation: "Understanding the quirks, scope, and prototype chain of JavaScript.",
              keyIdeas: [
                "Closures & Lexical Scoping",
                "Hoisting & The Event Loop",
                "`this` Binding & Arrow Functions"
              ],
              patterns: [
                "Currying",
                "Memoization"
              ],
              example: "Write a polyfill for Array.prototype.map.",
              problems: [],
              tips: ["Closures are the most frequently asked JS interview topic."]
            }
          ]
        },
        {
          topic: "Asynchronous JavaScript",
          levels: [
            {
              name: "Promises & Async/Await",
              explanation: "Handling network requests and non-blocking I/O operations.",
              keyIdeas: [
                "Microtask Queue vs Macrotask Queue",
                "Promise.all / Promise.race",
                "Fetch API & Axios"
              ],
              patterns: [
                "Polling",
                "Handling race conditions"
              ],
              example: "Implement a retry mechanism for failed API calls.",
              problems: [],
              tips: ["Always wrap async/await in try/catch blocks."]
            }
          ]
        }
      ]
    },

    // ========================= FRONTEND FRAMEWORKS =========================
    {
      title: "Modern UI Frameworks",

      skills: [
        {
          topic: "React Excellence",
          levels: [
            {
              name: "React Hooks & Lifecycle",
              explanation: "Building declarative UIs and managing component side-effects.",
              keyIdeas: [
                "Virtual DOM & Reconciliation",
                "useEffect & Dependency Arrays",
                "Custom Hooks"
              ],
              patterns: [
                "Higher-Order Components (HOCs)",
                "Render Props"
              ],
              example: "Build a custom useDebounce hook.",
              problems: [],
              tips: ["Understand exactly what triggers a component re-render."]
            }
          ]
        },
        {
          topic: "State Management",
          levels: [
            {
              name: "Global State",
              explanation: "Managing complex data that must be shared across disparate components.",
              keyIdeas: [
                "Context API + useReducer",
                "Redux Toolkit / Zustand",
                "Server State (React Query)"
              ],
              patterns: [
                "Flux Architecture",
                "Optimistic UI Updates"
              ],
              example: "Implement a shopping cart using Redux Toolkit.",
              problems: [],
              tips: ["Don't use Redux for server-state caching; use React Query instead."]
            }
          ]
        },
        {
          topic: "Next.js & Server-Side Rendering",
          levels: [
            {
              name: "Advanced Frameworks",
              explanation: "Pre-rendering React to static HTML for insane SEO and performance.",
              keyIdeas: [
                "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
                "Next.js App Router vs Pages Router",
                "Server Components"
              ],
              patterns: [
                "Incremental Static Regeneration (ISR)",
                "API Routes"
              ],
              example: "Fetch data securely via a Next.js Server Component.",
              problems: [],
              tips: ["Mastering Next.js makes you an invaluable full-stack hybrid."]
            }
          ]
        }
      ]
    },

    // ========================= TYPE SAFETY & TOOLING =========================
    {
      title: "Type Safety & Testing",

      skills: [
        {
          topic: "TypeScript Fundamentals",
          levels: [
            {
              name: "Static Typing for JS",
              explanation: "Adding strict type-checking to JavaScript to eliminate runtime errors.",
              keyIdeas: [
                "Interfaces & Types",
                "Generics",
                "Utility Types (Partial, Omit)"
              ],
              patterns: [
                "Discriminated Unions",
                "Type Guards"
              ],
              example: "Type a complex API response payload with nested interfaces.",
              problems: [],
              tips: ["TypeScript is standard across 90%+ of modern Enterprise roles."]
            }
          ]
        },
        {
          topic: "Frontend Testing",
          levels: [
            {
              name: "QA & Reliability",
              explanation: "Ensuring applications function identically across any condition.",
              keyIdeas: [
                "Unit Testing (Jest)",
                "Component Integration (React Testing Library)",
                "E2E Testing (Cypress / Playwright)"
              ],
              patterns: [
                "Mocking network requests",
                "Test-Driven Development (TDD)"
              ],
              example: "Write a Jest test to verify an Accordion successfully expands.",
              problems: [],
              tips: ["React Testing Library focuses on how users interact with the DOM, not inner state."]
            }
          ]
        }
      ]
    },

    // ========================= ARCHITECTURE, PERFORMANCE & SECURITY =========================
    {
      title: "Architecture, Performance & Security",

      skills: [
        {
          topic: "Web Security (XSS & CORS)",
          levels: [
            {
              name: "Securing the Client",
              explanation: "Protecting users from malicious scripts, data theft, and broken auth.",
              keyIdeas: [
                "Cross-Site Scripting (XSS)",
                "Cross-Site Request Forgery (CSRF)",
                "Content Security Policy (CSP)"
              ],
              patterns: [
                "Sanitizing user input",
                "Secure HTTP-only cookies"
              ],
              example: "Implement a CSP to block external unauthorized image domains.",
              problems: [],
              tips: ["Never, ever use dangerouslySetInnerHTML without sanitizing (e.g., DOMPurify) first."]
            }
          ]
        },
        {
          topic: "Web Performance (Core Web Vitals)",
          levels: [
            {
              name: "Optimization",
              explanation: "Making applications load instantly and run at 60fps.",
              keyIdeas: [
                "LCP, CLS, FID (Web Vitals)",
                "Code Splitting & Lazy Loading",
                "Image Optimization & WebP"
              ],
              patterns: [
                "Debouncing & Throttling",
                "Tree Shaking"
              ],
              example: "Lazy load a heavy charting library only when needed.",
              problems: [],
              tips: ["Performance is a feature. Learn to use Chrome DevTools Lighthouse."]
            }
          ]
        },
        {
          topic: "Frontend System Design",
          levels: [
            {
              name: "Architecture Design",
              explanation: "Planning the state, API, and component tree of a large-scale application.",
              keyIdeas: [
                "Component Hierarchy",
                "State Normalization",
                "Pagination & Infinite Scroll"
              ],
              patterns: [
                "Micro-frontends",
                "Monorepos"
              ],
              example: "Design the architecture for an infinite-scrolling News Feed.",
              problems: [],
              tips: ["The most critical interview round for Senior Frontend Engineers."]
            }
          ]
        }
      ]
    },

    // ========================= CODING INTERVIEWS =========================
    {
      title: "Algorithms & Machine Coding",

      skills: [
        {
          topic: "DSA for Frontend",
          levels: [
            {
              name: "DOM & Arrays",
              explanation: "Applying algorithms specifically to browser and UI contexts.",
              keyIdeas: [
                "DOM Traversal (Trees)",
                "String Manipulation",
                "Hash Maps for Caching"
              ],
              patterns: [
                "Recursive DOM Search",
                "Two Pointers"
              ],
              example: "Flatten a deeply nested JavaScript object.",
              problems: [],
              tips: ["Frontend DSA focuses heavily on Trees (like the DOM) and Objects."]
            }
          ]
        }
      ]
    }

  ]
};