import { Paragraph } from "@/shared/components/ui/Paragraph";
import { motion } from "framer-motion";
import { sponsors } from "../data/data";
import { Heading } from "@/shared/components/ui/Heading";

export const Aliados = () => {
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
        <Heading align="center">Aliados Estratégicos</Heading>
        <Paragraph className="max-w-2xl mx-auto">
          Instituciones que comparten nuestra visión y apoyan nuestra misión
        </Paragraph>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-40 hover:shadow-xl transition-shadow border dark:border-slate-600"
          >
            <div className="text-4xl mb-4">{sponsor.logo}</div>
            <Heading level="h4" align="center" color="muted">
              {sponsor.name}
            </Heading>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
