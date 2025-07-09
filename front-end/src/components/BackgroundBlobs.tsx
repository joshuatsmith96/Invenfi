import Blob from "./Blob";
import { Blob1, Blob2 } from "./Login/BlobSpecs";

const BackgroundBlobs = () => {
  return (
    <>
      <Blob
        location={Blob1.Location}
        dimension={Blob1.Dimension}
        circleClass="circle-move-1"
      ></Blob>
      <Blob
        location={Blob2.Location}
        dimension={Blob2.Dimension}
        circleClass="circle-move-1"
      ></Blob>
    </>
  );
};

export default BackgroundBlobs;
