export * from 'gsap';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);
export { useGSAP };
