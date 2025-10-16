'use client';

import { motion } from 'framer-motion';

export default function WorkSection() {
  const projects = [
    {
      title: "CPCompass",
      description: "Investment platform with mobile banking capabilities",
      image: "/images/home/onlinePresence/cpcompass.png",
      tags: ["Investment Platform", "Mobile Banking"],
      link: "https://www.app.cpcompass.ng/"
    },
    {
      title: "Sise",
      description: "Workflow management system with intuitive interface design",
      image: "/images/home/onlinePresence/project1.png",
      tags: ["Workflow Management", "Interface Design"],
      link: "https://www.sise.com/"
    },
    {
      title: "Mallam X",
      description: "E-wallet platform with currency exchange functionality",
      image: "/images/home/onlinePresence/project2.png",
      tags: ["E-Wallet", "Currency Exchange"],
      link: "https://www.mallamx.com/"
    },
    {
      title: "We Sleep",
      description: "NFT and cryptocurrency platform for digital assets",
      image: "/images/home/onlinePresence/project7.png",
      tags: ["NFT", "Cryptocurrency"],
      link: "https://www.wesleep.io/"
    },
    {
      title: "RFTF",
      description: "Fitness tracking app with event management features",
      image: "/images/home/onlinePresence/project3.png",
      tags: ["Fitness Tracking", "Event Management"],
      link: "https://www.rftf.com/"
    },
    {
      title: "Burnout",
      description: "Team management platform with web and mobile design",
      image: "/images/home/onlinePresence/project4.png",
      tags: ["Team Management", "Web & Mobile Design"],
      link: "https://www.burnout.com/"
    }
  ];


  return (
    <section id="work" className="py-20 bg-transparent">
      <div className="container">
        <motion.div 
          className="flex flex-col justify-center items-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              How we transformed a small business's <span className="italic">online presence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-4">
                  <img 
                    alt={project.title}
                    loading="lazy"
                    width="625"
                    height="410"
                    className={`rounded-2xl w-full h-[410px] object-cover ${
                      index === 0 || index === 3 ? "brightness-75 contrast-110" : ""
                    }`}
                    src={project.image}
                  />
                  <a 
                    target="blank" 
                    className="absolute top-0 left-0 bg-black/50 w-full h-full rounded-2xl hidden group-hover:flex" 
                    href={project.link}
                  >
                    <span className="flex justify-end p-5 w-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-12 h-12 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </span>
                  </a>
                </div>
                
                <div className="flex flex-col items-start gap-4">
                  <h5 className="group-hover:text-blue-600 text-xl font-bold text-gray-800">
                    {project.title}
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <p 
                        key={tagIndex}
                        className="text-xs sm:text-sm border border-gray-300 w-fit py-1 sm:py-1.5 px-3 sm:px-4 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
