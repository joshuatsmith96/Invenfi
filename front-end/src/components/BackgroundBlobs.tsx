import Blob from "./Blob";
import { blobSettings1, blobSettings2, blobSettings3, blobSettings4 } from '../utils/BlobSpec';

const BackgroundBlobs = () => {
  
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none">
      <Blob styles={blobSettings1} movement={1} />
      <Blob styles={blobSettings2} movement={2} />
      <Blob styles={blobSettings3} movement={1} />
      <Blob styles={blobSettings4} movement={2} />
    </div>
  );
};

export default BackgroundBlobs;
