"use client"
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PageTitleWrapper from '@/components/Home/pageTitleWrapper';

function PageHeader() {
    const user = {
        name: 'AC',
        avatar: '/static/images/avatars/1.jpg'
    };
    const theme = useTheme();
    var hours = new Date().getHours();
    return (
        <PageTitleWrapper>
            <Grid container alignItems="center">
                <Grid item>
                    <Avatar
                        sx={{
                            mr: 2,
                            width: theme.spacing(8),
                            height: theme.spacing(8)
                        }}
                        variant="rounded"
                        alt={user.name}
                        src={user.avatar}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Welcome, {user.name}!
                    </Typography>
                    <Typography variant="subtitle2">
                        {hours > 12 ? "Good Afternoon!" : "Good Morning!"}
                    </Typography>
                </Grid>
            </Grid>
        </PageTitleWrapper>

    );
}

export default PageHeader;