// src/pages/DashboardLayoutBasic.tsx
import React, { useState, useEffect } from "react";
import { createTheme, styled } from "@mui/material/styles";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessibilityIcon from "@mui/icons-material/Accessibility";

import { Students } from "../models/students";
import StudentsList from "../components/StudentsList";
import { fetchAllStudents } from "../service/studentsService";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Menu" },
  {
    segment: "Students-list",
    title: "Students list",
    icon: <AccessibilityIcon />,
  },
  { segment: "management", title: "Management", icon: <ManageAccountsIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Compte" },
  { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: { colorSchemeSelector: "class" },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);
  return {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  };
}

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;
  const [students, setStudents] = useState<Students[]>([]);
  const [showStudentsTable, setShowStudentsTable] = useState(false);

  useEffect(() => {
    if (router.pathname === "/Students-list") {
      fetchAllStudents()
        .then((data) => {
          setStudents(data);
          setShowStudentsTable(true);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid size={5} />
            {showStudentsTable ? (
              <Grid size={12}>
                <StudentsList students={students} />
              </Grid>
            ) : (
              <>
                <Grid size={12}>
                  <Skeleton height={14} />
                </Grid>
                <Grid size={12}>
                  <Skeleton height={14} />
                </Grid>
                <Grid size={4}>
                  <Skeleton height={100} />
                </Grid>
                <Grid size={8}>
                  <Skeleton height={100} />
                </Grid>
                <Grid size={12}>
                  <Skeleton height={150} />
                </Grid>
                <Grid size={12}>
                  <Skeleton height={14} />
                </Grid>
                <Grid size={3}>
                  <Skeleton height={100} />
                </Grid>
                <Grid size={3}>
                  <Skeleton height={100} />
                </Grid>
                <Grid size={3}>
                  <Skeleton height={100} />
                </Grid>
                <Grid size={3}>
                  <Skeleton height={100} />
                </Grid>
              </>
            )}
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
