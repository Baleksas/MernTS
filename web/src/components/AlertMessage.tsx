import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import React from "react";
interface AlertMessageProps {
  status: "info" | "warning" | "success" | "error";
  message: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  status,
  message,
}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};
