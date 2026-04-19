import "./index.css";
import { Composition } from "remotion";
import { RecoveraOpening } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RecoveraOpening"
        component={RecoveraOpening}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
