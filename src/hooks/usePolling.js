import { useEffect, useState } from "react";
import { getInitialReactions, getNewReactions } from "../Services/getReaccions";

export const usePolling = (userId) => {
  const [reactions, setReactions] = useState({});
  const [newReaction, setNewReaction] = useState(null);

  useEffect(() => {
    const transformData = (data) => {
      const transformed = data.publications.reduce((acc, publication) => {
        acc[publication.id] = {
          reactionCount: publication.reactionCount,
          hasReacted: publication.hasReacted,
        };
        return acc;
      }, {});
      return transformed;
    };

    const getReaccion = async (userId) => {
      try {
        const data = await getInitialReactions(userId);
        if (data) {
          const transformedData = transformData(data);
          setReactions(transformedData);
          getNewReaction(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getNewReaction = async (userId) => {
      try {
        const data = await getNewReactions(userId);
        if (data) {
          const { id, reactionCount, hasReacted } = data;
          setReactions((prevReactions) => ({
            ...prevReactions,
            [id]: {
              reactionCount,
              hasReacted,
            },
          }));
          getNewReaction(userId); // se Vuelve a llamar a getNewReaction después de actualizar el estado
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReaccion(userId);
  }, [userId]);

  return { reactions };
};