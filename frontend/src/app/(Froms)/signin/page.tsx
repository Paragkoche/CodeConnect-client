"use client"
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Typography, alpha, lighten, useTheme } from "@mui/material"
import { useState } from "react"
import Link from 'next/link';
import { Login, SignIn } from '@/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from "@/reducers/slices/user.reducer"
import { useRouter } from 'next/navigation';
import { setItem } from '@/lib/storage';
const Page = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch()
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [fData, setFData] = useState({
        name: '',
        username: '',
        phone_number: '',
        email: '',
        role: '',
        password: ''
    })
    const router = useRouter()
    return (
        <Box
            sx={{
                flex: 1,
                height: "100%",
                width: "100%",
                ".MuiPageTitle-wrapper": {
                    background:
                        theme.palette.mode === "dark"
                            ? theme.colors.alpha.trueWhite[5]
                            : theme.colors?.alpha.white[50],
                    marginBottom: `${theme.spacing(4)}`,
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? `0 1px 0 ${alpha(lighten(theme.colors.primary.main, 0.7), 0.15) ||
                            ""
                            }, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                            : `0px 2px 4px -3px ${alpha(
                                theme.colors?.alpha.black[100] || "#FFFFFF",
                                0.1
                            )}, 0px 5px 12px -4px ${alpha(
                                theme.colors?.alpha.black[100] || "#FFFFFF",
                                0.05
                            )}`,
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Card>
                    <CardHeader title="Sing-in" />
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                SignIn({ ...fData, phone_number: "+91" + fData.phone_number, email: fData.email + "@raisoni.net", }).then((data) => {
                                    console.log(data);
                                    toast.success(data.data.message);
                                    setItem("token", data.data.data.token);
                                    dispatch(login({ ...data.data.data, token: undefined }))
                                    router.push(`/dash-board/${data.data.data.role}`)
                                }, (e: AxiosError | any) => {
                                    if (e.response?.data)
                                        toast.error(e.response?.data.message || "")

                                })
                            }}

                        >
                            <Box>
                                <FormControl sx={{ margin: "0 20px 0px 5px" }} >
                                    <InputLabel>Name</InputLabel>
                                    <OutlinedInput

                                        value={fData.name}
                                        onChange={(e) => setFData(s => ({ ...s, name: `${e.target.value}` }))}
                                        required
                                        id="standard-required"
                                        label="Name"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl sx={{ margin: "0 0 20px 5px" }}>
                                    <InputLabel>Username</InputLabel>
                                    <OutlinedInput
                                        startAdornment={<InputAdornment position="start">@</InputAdornment>}
                                        value={fData.username}
                                        onChange={(e) => setFData(s => ({ ...s, username: `${e.target.value}` }))}
                                        required
                                        id="standard-required"
                                        label="Username"
                                        fullWidth
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControl >
                                    <InputLabel>Phone Number</InputLabel>
                                    <OutlinedInput
                                        startAdornment={<InputAdornment position={"start"}>+91</InputAdornment>}
                                        value={fData.phone_number}
                                        onChange={(e) => setFData(s => ({ ...s, phone_number: `${e.target.value}` }))}
                                        required
                                        id="standard-required"
                                        label="Phone Number"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl >
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">@raisoni.net</InputAdornment>}
                                        value={fData.email}
                                        onChange={(e) => setFData(s => ({ ...s, email: `${e.target.value}` }))}
                                        required
                                        id="standard-required"
                                        label="Email"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        value={fData.password}
                                        required
                                        onChange={(e) => setFData(s => ({ ...s, password: e.target.value }))}

                                        fullWidth
                                        id="standard-required"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Role"
                                    helperText="Please select your Role"
                                    value={fData.role}
                                    onChange={(e) => setFData((s) => ({ ...s, role: e.target.value }))}
                                >
                                    {["Teacher", "Student"].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box py={2}>
                                <Button type={"submit"} sx={{ mb: 1 }} fullWidth>Submit</Button>
                                <Divider />
                                <Typography sx={{ pt: 2, textTransform: 'uppercase' }} textAlign={"center"}>
                                    <Link style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }} href={"/login"}>Login</Link>
                                </Typography>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default Page


