import { Box, Heading } from "@chakra-ui/react";

const Time = () => {
  const now = new Date();

  // Get day of week name
  const day = now.toLocaleDateString(undefined, { weekday: "long" }); // e.g. "Thursday"

  // Get date in a readable format, e.g. "June 26, 2025"
  const date = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      <Box justifyItems="center">
        <Heading style={{ paddingLeft: "5px" }}>{day}</Heading>
        <div>
          {date} {time}
        </div>
      </Box>
    </>
  );
};

export default Time;
