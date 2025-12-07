import { motion } from 'motion/react';

interface Props {
  index: number;
}

export function TimelineConnector({ index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.25, 
        delay: 0.05,
        ease: 'easeOut'
      }}
      viewport={{ once: true, margin: '0px 0px -150px 0px' }} // Only animate when next card is well into view
      className="flex justify-center py-1 sm:py-2"
    >
      <div className="flex flex-col items-center">
        <div
          className="w-px h-6"
          style={{ backgroundColor: '#c9a050' }}
        />
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: '#c9a050' }}
        />
        <div
          className="w-px h-6"
          style={{ backgroundColor: '#c9a050' }}
        />
      </div>
    </motion.div>
  );
}

