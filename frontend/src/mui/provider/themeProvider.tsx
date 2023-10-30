import { useAppSelector } from "@/reducers/hook";
import { themeCreator } from "../theme/base";
import { StylesProvider } from "@mui/styles";
import { Container, CssBaseline, ThemeProvider as TP } from "@mui/material";
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const Theme = useAppSelector((state) => state.uiReducer.value.theme);
    const theme = themeCreator(Theme);
    // console.log(theme);

    return (
        <StylesProvider injectFirst>
            <TP theme={theme}>
                <CssBaseline />
                {children}
            </TP>
        </StylesProvider>
    );
};

export default ThemeProvider;
