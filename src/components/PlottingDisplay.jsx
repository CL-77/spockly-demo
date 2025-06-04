import { Box, Fab, Stack, Typography } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { darkTheme, lightTheme } from "../appTheme";

const PlottingDisplay = ({ plot, isDarkMode }) => {
    const theme = isDarkMode ? darkTheme : lightTheme;

    // useEffect(() => {
    //     const handler = () => {
    //         const el = document.getElementById('plotting-display');
    //         const el2 = document.getElementById('hidePlotElement');
    //         if (el) {
    //             el.innerText = 'Plot hidden';
    //             el.style.color = theme.palette.primary.contrastText;
    //             if(el2) {
    //                 el2.innerText = 'Show plot';
    //                 el2.style.color = theme.palette.primary.light;
    //             }
    //         }
    //     };
    //     document.addEventListener('hidePlot', handler, { once: true });
    //     return () => {
    //         document.removeEventListener('hidePlot', handler);
    //     };
    // }, [theme.palette.primary.contrastText]);

    // useEffect(() => {
    //     if(plot) {
    //         const el = document.getElementById('plotting-display');
    //         if (el) {
    //             el.innerHTML = '<img src="data:image/jpeg;base64,' + plot + '" alt="Plot" style="width: 100%; height: auto; border-radius: 5px;" />';
    //             el.style.color = theme.palette.primary.contrastText;
    //             document.location.hash = 'plotting-display';
    //         }
    //     }
    // });

    return (
        <Box
            sx={{
                // bottom: 20,
                right: 20,
                left: 20,
                height: "200px",
                borderRadius: "5px",
                zIndex: 1,
                // overflow: "visible",
            }}
            >
                {/* <Stack direction="row">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            color: theme.palette.primary.light,
                            paddingBottom: "15px",
                        }}
                    >
                        Plot
                    </Typography> */}

                    {/* <Fab
                        size="small"
                        variant="extended"
                        sx={{
                            left: 20,
                            width: "120px",
                            bgcolor: "#00c853",
                            color: theme.palette.primary.light,
                            "&:hover": {
                            bgcolor: "#05A255",
                            },
                            boxShadow: "none",
                        }}
                        onClick={() => {
                            const event = new Event("hidePlot", { bubbles: true, cancelable: true });
                            document.dispatchEvent(event);
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={ 0.5 }>
                            <VisibilityOff fontSize="small" />
                            <Typography fontWeight="bold"><p id="hidePlotElement">Hide plot</p></Typography>
                        </Box>
                    </Fab> */}
                {/* </Stack> */}

                <Box
                    id="plotting-display"
                    sx={{
                    position: "relative",
                    borderRadius: "5px",
                    width: "100%",
                    height: "250%",
                    bgcolor: theme.palette.background.paper,
                    zIndex: 101,
                    overflow: "auto",
                    resize: "vertical",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {plot ? (
                    <img
                        src={`data:image/jpeg;base64,${plot}`}
                        alt="Plot"
                        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                    />
                ) : (
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            color: isDarkMode ? "#FFFFFA" : "#000000",
                            padding: "20px",
                            whiteSpace: 'pre',
                        }}
                    >
                        Generated plot will appear here...
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PlottingDisplay;