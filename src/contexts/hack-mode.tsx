"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface HackModeContextType {
	isHackMode: boolean;
	toggleHackMode: () => void;
}

const HackModeContext = createContext<HackModeContextType | undefined>(
	undefined,
);

export function HackModeProvider({ children }: { children: ReactNode }) {
	const [isHackMode, setIsHackMode] = useState(false);
	const audioContextRef = useRef<AudioContext | null>(null);
	const ambientNodesRef = useRef<{
		osc: OscillatorNode;
		gain: GainNode;
	} | null>(null);

	const getAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}
		if (audioContextRef.current.state === "suspended") {
			audioContextRef.current.resume();
		}
		return audioContextRef.current;
	}, []);

	const playClick = useCallback(
		(activating: boolean) => {
			const ctx = getAudioContext();
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.frequency.value = activating ? 1000 : 600;
			osc.type = "square";
			gain.gain.setValueAtTime(0.08, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(
				0.001,
				ctx.currentTime + 0.06,
			);
			osc.start(ctx.currentTime);
			osc.stop(ctx.currentTime + 0.06);
		},
		[getAudioContext],
	);

	const startAmbient = useCallback(() => {
		const ctx = getAudioContext();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.frequency.value = 70;
		osc.type = "sine";
		gain.gain.setValueAtTime(0.15, ctx.currentTime);
		osc.start();
		ambientNodesRef.current = { osc, gain };
	}, [getAudioContext]);

	const stopAmbient = useCallback(() => {
		if (ambientNodesRef.current) {
			const { osc, gain } = ambientNodesRef.current;
			const ctx = audioContextRef.current;
			if (ctx) {
				gain.gain.exponentialRampToValueAtTime(
					0.001,
					ctx.currentTime + 0.3,
				);
			}
			setTimeout(() => {
				osc.stop();
			}, 300);
			ambientNodesRef.current = null;
		}
	}, []);

	const toggleHackMode = useCallback(() => {
		setIsHackMode(prev => {
			const next = !prev;
			playClick(next);
			if (next) {
				startAmbient();
			} else {
				stopAmbient();
			}
			return next;
		});
	}, [playClick, startAmbient, stopAmbient]);

	useEffect(() => {
		document.body.classList.toggle("hack-mode", isHackMode);
		return () => document.body.classList.remove("hack-mode");
	}, [isHackMode]);

	useEffect(() => {
		return () => {
			stopAmbient();
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, [stopAmbient]);

	return (
		<HackModeContext.Provider value={{ isHackMode, toggleHackMode }}>
			{children}
		</HackModeContext.Provider>
	);
}

export function useHackMode() {
	const context = useContext(HackModeContext);
	if (context === undefined) {
		throw new Error("useHackMode must be used within a HackModeProvider");
	}
	return context;
}
