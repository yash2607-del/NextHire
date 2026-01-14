import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="card-stack-container">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="card-stack-item"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="card-stack-content">
              <div className="card-stack-icon">
                {card.icon}
              </div>
              <div className="card-stack-text">
                <h3>{card.name}</h3>
                <p className="card-stack-designation">{card.designation}</p>
                {card.content && <div className="card-stack-body">{card.content}</div>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
