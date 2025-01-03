import {
  threejs,
  nodejs,
  reactjs,
  mongodb,
  javascript,
  git,
  tailwind,
  redux,
  github,
  webgif,
  graphic,
  seo,
  sw,
} from "../assets";
export const navLinks = [
  {
    id: "About",
    title: "About",
  },
  {
    id: "Services",
    title: "Services",
  },
  {
    id: "Contact",
    title: "Contact",
  },
];
export const services = [
  {
    title: "Web development",
    animationData:webgif,
    description:'Crafting sleeek and responsive websites for modern businesses.',
    // tech:technologies,    
  },
  {
    title: "Graphic Design",
    animationData: graphic,
    description:"Innovative and captivating designs to define your brand Identity.",
  
  },

  {
    title: "SEO & Digital Marketing",
    animationData:seo,
    description:'Strategies that amplify your online presence and connect you with your audience.',
  },
  {
    title: "Software Development",
    animationData:sw,
    description:'Custom Software solution tailored to your unique needs'
  },
];
// testimonials
// export const technologies = [
//   {
//     name: "nodejs",
//     icon: nodejs,
//   },
//   {
//     name: "threeJs",
//     icon: threejs,
//   },

//   {
//     name: "React JS",
//     icon: reactjs,
//   },
//   {
//     name: "Tailwind CSS",
//     icon: tailwind,
//   },
//   {
//     name: "MongoDB",
//     icon: mongodb,
//   },
//   {
//     name: "git",
//     icon: git,
//   },
//   {
//     name: "Redux Toolkit",
//     icon: redux,
//   },
//   {
//     name: "JavaScript",
//     icon: javascript,
//   },
// ];
export const projects = [
  {
    name: "Clone Cloud Hosting site",
    description:
      "Web-based platform that displays cool animations and responsiveness.",
    tags: [
      {
        name: "JS",
        color: "blue-text-gradient",
      },
      {
        name: "TailwindCSs",
        color: "green-text-gradient",
      },
    ],
    image: javascript,
    source_code_link: "https://github.com/E1675ka/Cloud-hosting-website-demo",
  },
  {
    name: "MERN stack authentication app demo",
    description:
      "This simple setup demonstrates how you can create a Node.js function to serve data to a frontend, where the frontend makes HTTP requests to fetch and send data..",
    tags: [
      {
        name: "nodejs",
        color: "blue-text-gradient",
      },
      {
        name: "javaScript",
        color: "green-text-gradient",
      },
    ],
    image: nodejs,
    source_code_link: "https://github.com/E1675ka/Cloud-hosting-website-demo",
  },
  {
    name: "React Tech Stack",
    description:
      "Building React Generated site with fabulous UI and reusable components .",
    tags: [
      {
        name: "nodejs",
        color: "blue-text-gradient",
      },
      {
        name: "javaScript",
        color: "green-text-gradient",
      },
    ],
    image: reactjs,
    source_code_link: "https://github.com/E1675ka/Cloud-hosting-website-demo",
  },
  {
    name: "React Tech Stack",
    description:
      "Redux a powerful for state management ready for state manipulation .",
    tags: [
      {
        name: "Redux",
        color: "blue-text-gradient",
      },
      {
        name: "Statemangent",
        color: "green-text-gradient",
      },
    ],
    image: redux,
    source_code_link: "https://github.com/E1675ka/Cloud-hosting-website-demo",
  },];

  export const testimonials = [
  {
    testimonial:
      "Partner with us for tailored digital solution that reflect your brand's uniqueness and deliver measurable results.",
    // name: "Sara Lee",
    // designation: "CFO",
    // company: "Acme Co",
    // image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  
];