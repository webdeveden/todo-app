import { Box, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TimeCreated = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDay = currentTime.toLocaleDateString([], {
    weekday: "long",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box mb={4} justifyItems="center">
      <Text fontSize="3xl" fontWeight="bold">
        {formattedDay}
      </Text>
      <HStack fontSize="sm" color="gray.300">
        <Text>{formattedDate}</Text>
        <Text>{formattedTime}</Text>
      </HStack>
    </Box>
  );
};

export default TimeCreated;
