import React, { useEffect, useRef, useState } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography, Divider, CircularProgress } from "@mui/material";
import { PlayArrow, Clear } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR();

const CANVAS_WIDTH = 1008; // double for HiDPI, visual size smaller
const CANVAS_HEIGHT = 504;
const VISUAL_CANVAS_WIDTH = 504;
const VISUAL_CANVAS_HEIGHT = 252;

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
	const canvasRef = useRef(null);
	const theme = isDarkMode ? darkTheme : lightTheme;
	const [textOutput, setTextOutput] = useState("");
	const [hasCanvas, setHasCanvas] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Init WebR and set up canvas device
	useEffect(() => {
		let isMounted = true;
		const initWebR = async () => {
			try {
				await webR.init();
				await webR.evalRVoid(`options(device=webr::canvas(${VISUAL_CANVAS_WIDTH}, ${VISUAL_CANVAS_HEIGHT}))`);
				if (webRRef) webRRef.current = webR;
				handleCanvasOutput();
			} catch (err) {
				setTextOutput(`Error initializing WebR: ${err.message}`);
			}
		};
		initWebR();
		return () => { isMounted = false; };
		// eslint-disable-next-line
	}, []);

	// Canvas output handler
	const handleCanvasOutput = async () => {
		while (true) {
			try {
				const output = await webR.read();
				if (output.type === 'canvas') {
					if (output.data.event === 'canvasImage') {
						const canvas = canvasRef.current;
						if (canvas && output.data.image) {
							const ctx = canvas.getContext('2d');
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.drawImage(output.data.image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
							setHasCanvas(true);
						}
					} else if (output.data.event === 'canvasNewPage') {
						const canvas = canvasRef.current;
						if (canvas) {
							const ctx = canvas.getContext('2d');
							ctx.clearRect(0, 0, canvas.width, canvas.height);
						}
					}
				}
			} catch (err) {
				setTimeout(handleCanvasOutput, 1000);
				break;
			}
		}
	};

	// Output reset
	const clearOutput = () => {
		setTextOutput("");
		setHasCanvas(false);
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d');
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		}
	};

	// R code execution
	const runCode = async () => {
		if (!code.trim()) {
			setTextOutput("No code to execute");
			return;
		}
		setIsLoading(true);
		setTextOutput("");
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d');
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		}
		try {
			await webR.evalRVoid(`options(device=webr::canvas(${VISUAL_CANVAS_WIDTH}, ${VISUAL_CANVAS_HEIGHT}))`);
			let result;
			try {
				result = await webR.evalR(code);
				const values = await result.toArray();
				const filtered = values.filter(val =>
					val && val.toString().trim() !== '' &&
					!val.toString().includes('R is a collaborative project') &&
					!val.toString().includes('Type ') &&
					!val.toString().includes('Copyright') &&
					!val.toString().includes('R version') &&
					val.toString() !== 'NULL'
				);
				if (filtered.length > 0) setTextOutput(filtered.join("\n"));
			} catch (err) {
				try {
					await webR.evalRVoid(code);
				} catch (voidErr) {
					setTextOutput(`Error: ${voidErr.message}`);
				}
			}
		} catch (err) {
			setTextOutput(`Error: ${err.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			sx={{
				height: "100%",
				borderRadius: "5px",
				zIndex: 1,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Stack direction="row" spacing={1}>
				<Typography
					variant="h6"
					fontWeight="bold"
					sx={{ color: theme.palette.primary.contrastText, pb: "15px" }}
				>
					Output
				</Typography>
				<Fab
					size="small"
					variant="extended"
					disabled={isLoading}
					sx={{
						width: "140px",
						bgcolor: isLoading ? "#666" : "#33bfff",
						color: theme.palette.primary.contrastText,
						"&:hover": {
							bgcolor: isLoading ? "#666" : "#00b0ff",
						},
						boxShadow: "none",
					}}
					onClick={runCode}
				>
					<Box display="flex" alignItems="center" gap={0.5}>
						<PlayArrow fontSize="small" />
						<Typography fontWeight="bold">
							{isLoading ? "Running..." : "Run R Code"}
						</Typography>
					</Box>
				</Fab>
				<Fab
					size="small"
					variant="extended"
					sx={{
						width: "100px",
						bgcolor: "#ff6b6b",
						color: "white",
						"&:hover": {
							bgcolor: "#ff5252",
						},
						boxShadow: "none",
					}}
					onClick={clearOutput}
				>
					<Box display="flex" alignItems="center" gap={0.5}>
						<Clear fontSize="small" />
						<Typography fontWeight="bold">Clear</Typography>
					</Box>
				</Fab>
			</Stack>
			<Divider sx={{ mb: 1 }} />

			{/* Text Output */}
			<Box
				sx={{
					mb: 1,
					minHeight: 60,
					maxHeight: 150,
					color: theme.palette.text.primary,
					background: theme.palette.background.paper,
					p: 1,
					borderRadius: 1,
					fontFamily: "monospace",
					fontSize: 16,
					border: `1px solid ${theme.palette.divider}`,
					overflowY: "auto",
				}}
			>
				{textOutput}
			</Box>

			{/* Graphics Output */}
			<Box
				sx={{
					minHeight: VISUAL_CANVAS_HEIGHT + 16,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					background: theme.palette.background.paper,
					borderRadius: 1,
					border: `1px solid ${theme.palette.divider}`,
					p: 1,
					fontFamily: "monospace",
					fontSize: 16,
					boxSizing: "border-box",
					width: "100%",
				}}
			>
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					style={{
						width: `${VISUAL_CANVAS_WIDTH}px`,
						height: `${VISUAL_CANVAS_HEIGHT}px`,
						border: "none",
						background: "#fff",
						display: hasCanvas ? "block" : "none",
					}}
				/>
				{!hasCanvas && (
					<Typography
						variant="body2"
						sx={{
							color: "#aaa",
							textAlign: "center",
							width: "100%",
							minHeight: `${VISUAL_CANVAS_HEIGHT}px`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default WebRRunner;
