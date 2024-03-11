import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [reports, setReports] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const addReport = () => {
    if (from && to) {
      const fromTime = new Date(from);
      const toTime = new Date(to);
      const downtimeDuration = (toTime - fromTime) / 60000; // milliseconds to minutes

      if (downtimeDuration < 0) {
        alert("The 'From' date must come before the 'To' date.");
        return;
      }

      const newReport = {
        from: fromTime.toString(),
        to: toTime.toString(),
        downtimeDuration: downtimeDuration,
      };

      setReports([...reports, newReport]);
      setFrom("");
      setTo("");
    } else {
      alert("Please select both From and To dates.");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6}>Downtime Report Manager</Heading>
      <Flex direction="column" mb={6}>
        <FormControl mb={4}>
          <FormLabel htmlFor="from">From</FormLabel>
          <Input type="datetime-local" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="to">To</FormLabel>
          <Input type="datetime-local" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addReport}>
          Add Report
        </Button>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
        <Heading size="md" mb={4}>
          Reports
        </Heading>
        {reports.length > 0 ? (
          <List spacing={3}>
            {reports.map((report, index) => (
              <ListItem key={index} borderWidth="1px" borderRadius="md" p={3}>
                <Text fontWeight="bold">From: {report.from}</Text>
                <Text fontWeight="bold">To: {report.to}</Text>
                <Text>Downtime Duration: {report.downtimeDuration} minutes</Text>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No reports added yet.</Text>
        )}
      </Box>
    </Container>
  );
};

export default Index;
