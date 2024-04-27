export * from 'gsap';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);
export { useGSAP };
