import Blob from "./Blob";
import { blobSettings1, blobSettings2, blobSettings3, blobSettings4 } from "./Login/BlobSpec";

const BackgroundBlobs = () => {
  
  return (
    <>
      <Blob styles={blobSettings1} movement={1}/>
      <Blob styles={blobSettings2} movement={2}/>
      <Blob styles={blobSettings3} movement={1}/>
      <Blob styles={blobSettings4} movement={2}/>
    </>
  );
};

export default BackgroundBlobs;
