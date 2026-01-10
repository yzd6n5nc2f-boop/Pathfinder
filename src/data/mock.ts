export type Contact = {
  id: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  availability?: string;
  notes?: string;
  isPrimary?: boolean;
};

export type Employer = {
  id: string;
  name: string;
  sector: string;
  areas: string[];
  description: string;
  howToApply: string[];
  tags: string[];
  website?: string;
  notes?: string;
};

export type Job = {
  id: string;
  title: string;
  area: string;
  type: "Full time" | "Part time" | "Apprenticeship";
  employerId: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  supportAvailable: string[];
  howToApply: string[];
};

export type Course = {
  id: string;
  title: string;
  summary: string;
  duration?: string;
  format?: string;
  areas?: string[];
  topics: string[];
  howToStart: string[];
};

export type TopicPost = {
  id: string;
  author: string;
  time: string;
  text: string;
};

export type Topic = {
  id: string;
  title: string;
  category: string;
  repliesCount: number;
  lastUpdated: string;
  posts: TopicPost[];
};

export const supportContacts: Contact[] = [
  {
    id: "caseworker-sarah",
    name: "Caseworker Sarah",
    role: "Your support adviser",
    phone: "07123 456 789",
    email: "sarah.caseworker@example.uk",
    availability: "Mon–Fri, 9am–5pm",
    notes: "Can help with appointments, benefits, and travel support.",
    isPrimary: true
  },
  {
    id: "mentor-dave",
    name: "Mentor Dave",
    role: "Peer mentor",
    phone: "07911 223 344",
    email: "dave.mentor@example.uk",
    availability: "Tue–Sat, 10am–6pm",
    notes: "Weekly check-ins and confidence building sessions."
  },
  {
    id: "counsellor-emma",
    name: "Counsellor Emma",
    role: "Counselling support",
    phone: "07455 998 221",
    email: "emma.counsellor@example.uk",
    availability: "Mon–Thu, 11am–4pm",
    notes: "Focuses on stress management and healthy routines."
  }
];

export const employers: Employer[] = [
  {
    id: "timpson-group",
    name: "Timpson Group",
    sector: "Repairs / retail",
    tags: ["Training", "Entry-level", "Apprenticeships"],
    areas: ["London", "Manchester", "Leeds", "Birmingham"],
    description:
      "Customer-facing roles across keyholder and repair services, with training and support.",
    howToApply: [
      "Ask your adviser to review the latest vacancies.",
      "Prepare a short CV with recent training and certificates.",
      "Apply online or through a local store manager."
    ],
    website: "https://www.timpson-group.co.uk",
    notes: "Examples only. Ask your case worker to support your application."
  },
  {
    id: "pret-a-manger",
    name: "Pret A Manger",
    sector: "Hospitality",
    tags: ["Entry-level", "Training"],
    areas: ["London", "Manchester", "Birmingham", "Bristol"],
    description: "Front-of-house and kitchen roles in busy city sites.",
    howToApply: [
      "Check vacancies in your area.",
      "Highlight customer service experience (formal or informal).",
      "Apply via the employer careers page."
    ],
    website: "https://www.pret.co.uk",
    notes: "Examples only. Roles vary by location."
  },
  {
    id: "halfords",
    name: "Halfords",
    sector: "Retail / workshop",
    tags: ["Training", "Entry-level"],
    areas: ["London", "Liverpool", "Leeds", "Glasgow"],
    description: "Retail, fitting, and bike servicing roles across the UK.",
    howToApply: [
      "Ask for local vacancies by store.",
      "Note any practical skills or qualifications.",
      "Apply online or in-store where available."
    ],
    website: "https://www.halfords.com",
    notes: "Examples only. Ask about training routes."
  },
  {
    id: "greggs",
    name: "Greggs",
    sector: "Food retail",
    tags: ["Entry-level", "Apprenticeships"],
    areas: ["Leeds", "Liverpool", "Manchester", "Glasgow"],
    description: "Retail and production roles with shift-based options.",
    howToApply: [
      "Look for roles in your district.",
      "Discuss shift patterns with your adviser.",
      "Apply online via careers pages."
    ],
    website: "https://www.greggs.co.uk",
    notes: "Examples only. Roles vary by site."
  },
  {
    id: "sainsburys",
    name: "Sainsbury’s",
    sector: "Supermarket / logistics",
    tags: ["Training", "Entry-level"],
    areas: ["London", "Birmingham", "Bristol", "Leeds"],
    description: "Store and warehouse roles with training support.",
    howToApply: [
      "Check roles by store or depot.",
      "Bring proof of training or licences.",
      "Apply online and follow the recruitment steps."
    ],
    website: "https://www.sainsburys.co.uk",
    notes: "Examples only. Speak with your adviser before applying."
  }
];

export const jobOpportunities: Job[] = [
  {
    id: "warehouse-operative-leeds",
    title: "Warehouse Operative",
    area: "Leeds",
    type: "Full time",
    employerId: "sainsburys",
    summary:
      "Support stock movement, picking, and packing with a friendly warehouse team.",
    responsibilities: [
      "Pick and pack customer orders safely.",
      "Keep the warehouse tidy and organised.",
      "Work with supervisors to meet daily targets."
    ],
    requirements: [
      "Reliable attendance and willingness to learn.",
      "Comfortable standing and moving for long periods.",
      "Basic understanding of health and safety."
    ],
    supportAvailable: ["Training provided", "Buddy system", "Uniform supplied"],
    howToApply: [
      "Speak with your adviser about availability.",
      "Prepare a short CV with recent training.",
      "Apply online and confirm shift patterns."
    ]
  },
  {
    id: "construction-trainee-manchester",
    title: "Construction Trainee",
    area: "Manchester",
    type: "Apprenticeship",
    employerId: "timpson-group",
    summary:
      "Learn practical site skills alongside experienced supervisors and trainers.",
    responsibilities: [
      "Support site setup and basic labouring tasks.",
      "Follow safety guidance and wear PPE.",
      "Attend training sessions and tool inductions."
    ],
    requirements: [
      "Interest in learning a trade.",
      "Ability to follow safety instructions.",
      "Willingness to travel to local sites."
    ],
    supportAvailable: ["On-the-job training", "Tools provided", "Mentor support"],
    howToApply: [
      "Confirm eligibility with your adviser.",
      "Prepare proof of ID and right to work.",
      "Apply through the employer careers page."
    ]
  },
  {
    id: "kitchen-assistant-liverpool",
    title: "Kitchen Assistant",
    area: "Liverpool",
    type: "Part time",
    employerId: "greggs",
    summary:
      "Help prep food and keep the kitchen running smoothly in a busy store.",
    responsibilities: [
      "Assist with food prep and cleaning.",
      "Follow food safety procedures.",
      "Support the team during busy service."
    ],
    requirements: [
      "Positive attitude and teamwork.",
      "Basic food safety awareness.",
      "Flexible availability for shifts."
    ],
    supportAvailable: ["Training provided", "Clear shift rota"],
    howToApply: [
      "Discuss preferred shifts with your adviser.",
      "Prepare a short work history.",
      "Apply online and follow the recruitment steps."
    ]
  },
  {
    id: "retail-assistant-london",
    title: "Retail Assistant",
    area: "London",
    type: "Full time",
    employerId: "halfords",
    summary:
      "Support customers in-store and learn practical retail and fitting tasks.",
    responsibilities: [
      "Greet customers and answer questions.",
      "Support stock replenishment.",
      "Assist with basic fittings when trained."
    ],
    requirements: [
      "Friendly communication skills.",
      "Willingness to learn new tasks.",
      "Comfortable working weekends."
    ],
    supportAvailable: ["Training provided", "Uniform supplied"],
    howToApply: [
      "Confirm availability with your adviser.",
      "Prepare references if possible.",
      "Apply via the employer website."
    ]
  },
  {
    id: "team-member-bristol",
    title: "Team Member",
    area: "Bristol",
    type: "Part time",
    employerId: "pret-a-manger",
    summary:
      "Join a supportive hospitality team with customer-facing training.",
    responsibilities: [
      "Prepare food and drinks to standard.",
      "Keep the shop floor clean and welcoming.",
      "Support colleagues during peak times."
    ],
    requirements: [
      "Friendly and respectful communication.",
      "Able to work early or late shifts.",
      "Comfortable standing for long periods."
    ],
    supportAvailable: ["Training provided", "Shift flexibility"],
    howToApply: [
      "Talk through shift options with your adviser.",
      "Prepare a short CV or work history.",
      "Apply through the employer careers site."
    ]
  },
  {
    id: "apprentice-baker-glasgow",
    title: "Apprentice Baker",
    area: "Glasgow",
    type: "Apprenticeship",
    employerId: "greggs",
    summary:
      "Learn baking skills with on-the-job training in a production setting.",
    responsibilities: [
      "Support daily baking prep and production.",
      "Follow hygiene and safety guidance.",
      "Learn from experienced bakers."
    ],
    requirements: [
      "Interest in learning food production.",
      "Reliability and punctuality.",
      "Willingness to work early mornings."
    ],
    supportAvailable: ["Training provided", "Mentor support", "Study time"],
    howToApply: [
      "Discuss apprenticeship options with your adviser.",
      "Prepare proof of ID and right to work.",
      "Apply via the employer careers page."
    ]
  }
];

export const courses: Course[] = [
  {
    id: "skills-training",
    title: "Skills Training",
    summary:
      "Short practical courses to build confidence and get ready for entry-level roles.",
    duration: "4–8 weeks",
    format: "In-person",
    areas: ["London", "Manchester", "Leeds", "Birmingham"],
    topics: ["Workplace basics", "Health & safety", "Customer service"],
    howToStart: [
      "Speak with your caseworker about local start dates.",
      "Bring ID and any training certificates.",
      "Plan travel support if needed."
    ]
  },
  {
    id: "education-programmes",
    title: "Education Programmes",
    summary:
      "Flexible study options to gain qualifications alongside job searching.",
    duration: "8–12 weeks",
    format: "Online / In-person",
    areas: ["Bristol", "Liverpool", "Glasgow", "London"],
    topics: ["Functional skills", "Digital basics", "Interview preparation"],
    howToStart: [
      "Ask your adviser to refer you to a local college.",
      "Choose a timetable that matches your appointments.",
      "Set goals for attendance and progress."
    ]
  },
  {
    id: "confidence-and-wellbeing",
    title: "Confidence & Wellbeing Course",
    summary:
      "Supportive sessions focused on wellbeing, routines, and planning.",
    duration: "6 weeks",
    format: "In-person",
    areas: ["Leeds", "Manchester", "Birmingham"],
    topics: ["Healthy routines", "Managing stress", "Goal setting"],
    howToStart: [
      "Check availability with your caseworker.",
      "Book a starter session.",
      "Bring any notes about your support plan."
    ]
  }
];

export const communityTopics: Topic[] = [
  {
    id: "staying-positive",
    title: "Staying positive after release",
    category: "Wellbeing",
    repliesCount: 12,
    lastUpdated: "Today",
    posts: [
      {
        id: "post-1",
        author: "Alex",
        time: "Today, 9:10am",
        text: "What routines are helping people stay positive in the first few weeks?"
      },
      {
        id: "post-2",
        author: "Jordan",
        time: "Today, 10:05am",
        text: "I’m trying short walks and checking in with my mentor every other day."
      }
    ]
  },
  {
    id: "housing-options",
    title: "Housing options advice",
    category: "Housing",
    repliesCount: 8,
    lastUpdated: "Yesterday",
    posts: [
      {
        id: "post-1",
        author: "Caseworker Sam",
        time: "Yesterday, 3:40pm",
        text: "Share tips on getting temporary accommodation sorted quickly."
      },
      {
        id: "post-2",
        author: "Leah",
        time: "Yesterday, 5:20pm",
        text: "Local housing charities helped me fast-track an appointment."
      }
    ]
  }
];

export const messages = [
  {
    sender: "Support adviser",
    snippet: "Checking in to see how your plans are going."
  },
  {
    sender: "Mentor Dave",
    snippet: "Shall we set up a call for tomorrow afternoon?"
  },
  {
    sender: "Community Team",
    snippet: "New local support group starting next week."
  }
];

export const resourceCards = [
  {
    id: "mental-health",
    title: "Mental Health Support",
    summary: "NHS and local crisis lines.",
    details: "Talk to a trained listener and get local referrals."
  },
  {
    id: "substance",
    title: "Substance Misuse Support",
    summary: "Confidential help for alcohol or drugs.",
    details: "Local recovery groups and immediate advice."
  },
  {
    id: "housing",
    title: "Housing & Refuges",
    summary: "Short-term and longer-term options.",
    details: "Support for emergency and temporary housing."
  },
  {
    id: "foodbanks",
    title: "Foodbanks",
    summary: "Find local food support.",
    details: "Vouchers and drop-in support nearby."
  }
];

export const areaOptions = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Liverpool",
  "Bristol",
  "Glasgow"
];

export const employmentSupport: Employer[] = [
  {
    id: "work-coach",
    name: "Work Coach Network",
    sector: "Employment support",
    tags: ["Training", "Entry-level"],
    areas: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol"],
    description: "Local advisers who help with CVs, interviews, and job plans.",
    howToApply: [
      "Ask your case worker to refer you.",
      "Bring any identification and release paperwork.",
      "Book a short session to plan next steps."
    ],
    notes: "Examples only. Availability varies by area."
  },
  {
    id: "skills-bootcamp",
    name: "Skills Bootcamp Hub",
    sector: "Training support",
    tags: ["Training", "Apprenticeships"],
    areas: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
    description: "Short courses to build confidence and practical skills.",
    howToApply: [
      "Talk to your adviser about local options.",
      "Choose a course that fits your release plan.",
      "Check start dates and transport support."
    ],
    notes: "Examples only. Ask about travel support."
  },
  {
    id: "local-employment-hub",
    name: "Local Employment Hub",
    sector: "Community support",
    tags: ["Entry-level"],
    areas: ["Liverpool", "Bristol", "Glasgow", "Leeds"],
    description: "Drop-in help with job applications and employer introductions.",
    howToApply: [
      "Check opening times before you travel.",
      "Bring a basic CV or work history.",
      "Ask for local employer introductions."
    ],
    notes: "Examples only. Service hours vary."
  }
];

export const mealPartners = [
  { name: "Pret A Manger", sponsored: true },
  { name: "Greggs", sponsored: false },
  { name: "McDonald’s", sponsored: true },
  { name: "Subway", sponsored: false },
  { name: "Costa", sponsored: false }
];

export const commsPartners = [
  {
    id: "ee",
    name: "EE",
    coverage: "UK network (example)",
    sponsored: true
  },
  {
    id: "o2",
    name: "O2",
    coverage: "UK network (example)",
    sponsored: false
  },
  {
    id: "vodafone",
    name: "Vodafone",
    coverage: "UK network (example)",
    sponsored: true
  },
  {
    id: "three",
    name: "Three",
    coverage: "UK network (example)",
    sponsored: false
  }
];

export const commsSponsoredOffers = [
  {
    id: "bonus-data",
    title: "Bonus data with top-up",
    description: "Example offer for release-day connectivity."
  },
  {
    id: "starter-sim",
    title: "Starter SIM pack",
    description: "Example offer to get started quickly."
  }
];

export const travelLinks = [
  {
    id: "google-maps",
    name: "Google Maps",
    href: "https://maps.google.com",
    description: "Use walking, bus, and driving directions to reach appointments."
  },
  {
    id: "national-rail",
    name: "National Rail",
    href: "https://www.nationalrail.co.uk",
    description: "Check mainline services and live departure boards."
  },
  {
    id: "tfl-journey",
    name: "TfL Journey Planner",
    href: "https://tfl.gov.uk/plan-a-journey",
    description: "Plan Tube and bus routes across London (example).",
    areas: ["London"]
  },
  {
    id: "tfl-tube-map",
    name: "TfL Tube map",
    href: "https://tfl.gov.uk/maps/track",
    description: "View the Tube map for London travel (example).",
    areas: ["London"]
  },
  {
    id: "swr",
    name: "South Western Railway (SWR)",
    href: "https://www.southwesternrailway.com",
    description: "Regional services in the South West and London (example).",
    areas: ["London", "Bristol"]
  },
  {
    id: "tfgm",
    name: "Transport for Greater Manchester (TfGM)",
    href: "https://tfgm.com",
    description: "Trams and bus information for Greater Manchester (example).",
    areas: ["Manchester"]
  },
  {
    id: "tfwm",
    name: "Transport for West Midlands (TfWM)",
    href: "https://www.tfwm.org.uk",
    description: "Local transport info for Birmingham and the West Midlands (example).",
    areas: ["Birmingham"]
  },
  {
    id: "metro",
    name: "West Yorkshire Metro",
    href: "https://www.wymetro.com",
    description: "Bus and rail information for Leeds and West Yorkshire (example).",
    areas: ["Leeds"]
  },
  {
    id: "merseytravel",
    name: "Merseytravel",
    href: "https://www.merseytravel.gov.uk",
    description: "Travel information for Liverpool and Merseyside (example).",
    areas: ["Liverpool"]
  },
  {
    id: "spt",
    name: "Strathclyde Partnership for Transport (SPT)",
    href: "https://www.spt.co.uk",
    description: "Local transport in Glasgow and the West of Scotland (example).",
    areas: ["Glasgow"]
  },
  {
    id: "west-of-england",
    name: "West of England Combined Authority",
    href: "https://www.westofengland-ca.gov.uk",
    description: "Travel updates for Bristol and the surrounding area (example).",
    areas: ["Bristol"]
  }
];

export const employersFilters = {
  locations: [
    "All locations",
    "London",
    "Manchester",
    "Birmingham",
    "Leeds",
    "Liverpool",
    "Bristol",
    "Glasgow"
  ],
  toggles: ["Training provided", "No experience"]
};
