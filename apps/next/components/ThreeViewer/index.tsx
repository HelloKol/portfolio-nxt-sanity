import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ rotation }: { rotation: number }) {
  const { scene } = useGLTF("/Neon_David.glb");
  return <primitive object={scene} scale={1} rotation={[0, rotation, 0]} />;
}

export default function ThreeDViewer({ rotation }: { rotation: number }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Model rotation={rotation} />
        </Suspense>
        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
}
