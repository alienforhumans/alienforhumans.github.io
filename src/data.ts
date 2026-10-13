export const profile = {
  name: 'Gurgen Varzhapetyan',
  shortName: 'Gurgen',
  role: 'Full-Stack Software Engineer',
  location: 'Gyumri, Armenia',
  email: 'gurgenvarzapetyan@gmail.com',
  phone: '+37494188674',
  phoneLabel: '+374 94 188 674',
  linkedIn: 'https://www.linkedin.com/in/gurgen-varzhapetyan-b9087120a/',
  cvPath: '/Gurgen-Varzhapetyan-CV.pdf',
  // Replace the placeholder asset with a portrait at any time.
  portraitSrc: '/portrait-placeholder.svg' as string | null,
  headline: 'Software Engineer | Full-Stack | TypeScript · React · Next.js · NestJS · PostgreSQL · AWS · AI-assisted development',
  summary:
    'I build production web applications, B2B SaaS platforms, and APIs. I started in frontend development and grew into full-stack engineering, taking ownership of backend architecture, database design, business logic, integrations, authentication, and production infrastructure.',
  detail:
    'I enjoy working on products where the hard part is making the system clear and maintainable as it grows: shaping business rules, structuring data, integrating services, and building reusable systems that help teams move faster.',
  availability:
    'Interested in international software engineering opportunities, including remote teams across time zones.',
}

export const skills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Prisma',
  'TypeORM',
  'Redis',
  'REST APIs',
  'Docker',
  'AWS',
  'Git',
]

export const experience = [
  {
    company: 'Brain Fors',
    role: 'Software Engineer',
    dates: 'July 2022 — Present',
    location: 'Gyumri, Armenia',
    highlights: [
      'Contributed to Upstart.am across frontend and backend, including tickets, bilingual courses, and QR-code workflows.',
      'Built web scraping and data collection scripts that turn third-party website content into structured data.',
      'Worked extensively on AestheticHubPro, with major responsibility for backend development, database architecture, business logic, and AWS system structure.',
      'Designed and developed AestheticHubPro’s website builder across frontend and backend, using reusable components, configurable content, and templates.',
      'Developed the frontend and application functionality for Global IT Award.',
      'Expanded from frontend implementation into full-stack engineering across APIs, authentication, databases, and application architecture.',
    ],
  },
  {
    company: 'LifeBeget',
    role: 'Angular Developer',
    dates: 'November 2021 — May 2022',
    location: 'Gyumri, Armenia',
    highlights: [
      'Contributed to complex dashboard products, including RosDomofon and Nabix.',
      'Also worked on secured client projects that cannot be shared publicly.',
    ],
  },
]

export const education = [
  {
    school: 'National Polytechnic University of Armenia, Gyumri Branch',
    degree: "Bachelor's degree, Applied Mathematics and Computer Science",
    dates: 'September 2021 — July 2025',
    icon: 'university',
  },
  {
    school: 'Academic Lyceum of Gyumri',
    degree: 'High School Diploma',
    dates: 'September 2018 — June 2021',
    icon: 'school',
  },
] as const

export const projects = [
  {
    name: 'Upstart.am',
    type: 'Education & events platform',
    description:
      'Frontend and backend contributions for event tickets, bilingual courses, and QR-code-based workflows.',
    href: 'https://www.upstart.am/',
    icon: 'school',
  },
  {
    name: 'AestheticHubPro',
    type: 'B2B SaaS platform',
    description:
      'Backend architecture, database design, business logic, AWS system structure, and a reusable website-builder module.',
    href: 'https://aesthetichubpro.com',
    icon: 'palette',
  },
  {
    name: 'Global IT Award',
    type: 'Web application',
    description:
      'Frontend implementation and application functionality based on project requirements.',
    href: 'https://www.globalitaward.am',
    icon: 'award',
  },
  {
    name: 'RosDomofon',
    type: 'Dashboard product',
    description: 'Contributed to the dashboard as part of complex product work at LifeBeget.',
    href: 'https://rosdomofon.com/',
    icon: 'dashboard',
  },
  {
    name: 'Nabix',
    type: 'Dashboard product',
    description: 'Contributed to the Nabix dashboard as part of complex product work at LifeBeget.',
    href: 'https://nabix.io/',
    icon: 'dashboard',
  },
  {
    name: 'Private client work',
    type: 'Confidential projects',
    description: 'Additional secured projects delivered at LifeBeget. Details and links are private.',
    href: null,
    icon: 'lock',
  },
] as const

export const navigation = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'person' },
  { id: 'resume', label: 'Resume', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'grid' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
] as const
