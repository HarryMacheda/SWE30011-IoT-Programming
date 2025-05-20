"use client"
import { theme } from "@/context/theme";
import { Box, Paper, ThemeProvider } from "@mui/material";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{background: "#ffffff"}}>
        <ThemeProvider theme={theme}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',}}>
            <Paper sx={{padding: 5, width:"70%", backgroundColor:"#f1f1f1"}}>
              {children}
            </Paper>
          </Box>
          </ThemeProvider>
      </body>
    </html>
  );
}
