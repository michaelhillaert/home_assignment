import * as React from "react";
import { Box, Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>{children}</Box>
    </Container>
  );
}
