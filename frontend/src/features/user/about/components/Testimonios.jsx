import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Heading } from "@/shared/components/ui/Heading";
import { Paragraph } from "@/shared/components/ui/Paragraph";
import { testimonials } from "../data/data";
export const Testimonios = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <Heading level="h2" align="center">
          Lo que dicen de nosotros
        </Heading>
        <Paragraph className="max-w-2xl mx-auto">
          Historias reales de personas que han transformado sus eventos con
          CulturaViva
        </Paragraph>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Heading level="h3" color="muted">{testimonial.name}</Heading>
                  <Paragraph size="sm" color="muted">
                    {testimonial.role}
                  </Paragraph>
                </div>
              </div>

              <div className="mb-4">
                <Quote className="text-gray-300 mb-2" size={24} />
                <Paragraph className="italic">"{testimonial.quote}"</Paragraph>
              </div>

              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};
