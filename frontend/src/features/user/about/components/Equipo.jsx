import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";

import { Paragraph } from "@/shared/components/ui/Paragraph";
import { Heading } from "@/shared/components/ui/Heading";
import { teamMembers } from "../data/data";
export const Equipo = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <Heading level="h2" align="center">
          Nuestro Equipo
        </Heading>
        <Paragraph className="max-w-2xl mx-auto">
          Apasionados por la cultura y comprometidos con nuestra comunidad
        </Paragraph>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <Heading level="h3">{member.name}</Heading>
                <Paragraph size="sm" className="opacity-90">
                  {member.role}
                </Paragraph>
              </div>
            </div>
            <div className="p-6">
              <Paragraph className="mb-4">{member.bio}</Paragraph>
              <div className="flex space-x-3">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    {platform === "twitter" && "𝕏"}
                    {platform === "linkedin" && "in"}
                    {platform === "github" && "Git"}
                    {platform === "instagram" && <Instagram size={20} />}
                    {platform === "facebook" && <Facebook size={20} />}
                    {platform === "whatsapp" && "WA"}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
