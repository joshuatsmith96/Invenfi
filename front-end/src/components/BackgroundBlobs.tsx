import Blob from "./Blob";
import { blobSettings1 } from "./Login/BlobSpec";

const BackgroundBlobs = () => {
  
  return (
    <>
      <Blob styles={blobSettings1} movement={1}/>
      {/* <div className="absolute top-[-200px] right-[-200px] w-100 h-100 bg-[#CCDEFF] rounded-full circle-move-2"></div> */}
    </>
  );
};

export default BackgroundBlobs;
