"use client";
import { PlayArrow } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

const data: {
  category: {
    name: string;
    corse: {
      name: string;
      link: string;
      host: string;
      image: string;
    }[];
  };
}[] = [
  {
    category: {
      name: "DSA",
      corse: [
        {
          name: "Mastering Data Structures & Algorithms using C and C++",
          link: "https://www.udemy.com/course/datastructurescncpp/",
          host: "UDEMY",
          image: "https://img-c.udemycdn.com/course/240x135/2121018_9de5_5.jpg",
        },
      ],
    },
  },
];

const Cores = () => {
  return (
    <div className="bg-purple-950 text-white p-8  h-[100vh]">
      <Container>
        {data.map((v, i) => (
          <>
            <Typography variant="h1">{v.category.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" gap={2}>
              {v.category.corse.map((v, i) => (
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140, width: 345 }}
                    title="Corse"
                    image={v.image}
                  />
                  <CardContent>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Box>
                        <Typography variant="h6">{v.name}</Typography>
                        <Typography variant="subtitle1">{v.host}</Typography>
                      </Box>

                      <IconButton
                        onClick={() => {
                          window.location.href = v.link;
                        }}
                        sx={{
                          borderRadius: "50%",
                        }}
                      >
                        <PlayArrow />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        ))}
      </Container>
    </div>
  );
};

export default Cores;
