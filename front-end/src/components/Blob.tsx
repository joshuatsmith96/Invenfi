type BlobLocation = {
  desktop: {
    direction1: string;
    value1: string;
    direction2?: string;
    value2?: string;
  };
  mobile?: {
    direction1: string;
    value1: string;
    direction2?: string;
    value2?: string;
  };
};

type BlobDimension = {
  desktop: {
    width: string;
    height: string;
  };
  mobile?: {
    width: string;
    height: string;
  };
};

type BlobType = {
  location: BlobLocation;
  dimension: BlobDimension;
  circleClass: string;
};

const Blob = ({ location, dimension, circleClass }: BlobType) => {
  const desktopLocation = location.desktop
    ? `${location.desktop.direction1}-[${location.desktop.value1}px]` +
      (location.desktop.direction2
        ? ` ${location.desktop.direction2}-[${location.desktop.value2}px]`
        : "")
    : "";

    const mobileLocation = location.desktop
    ? `max-md:${location.desktop.direction1}-[${location.desktop.value1}px]` +
      (location.desktop.direction2
        ? ` max-md:${location.desktop.direction2}-[${location.desktop.value2}px]`
        : "")
    : "";

    const desktopDimensionStyles = dimension.desktop ? `w-${dimension.desktop.width} h-${dimension.desktop.height}` : ""
    const mobileDimensionStyles = dimension.mobile ? `max-md:w-${dimension.mobile.width} max-md:h-${dimension.mobile.height}` : ""
    
    console.log(desktopLocation)

  return (
    <div
      className={`${circleClass} absolute ${desktopLocation} ${desktopDimensionStyles} bg-[#CCDEFF] rounded-full ${mobileDimensionStyles} ${mobileLocation}`}
    ></div>
  );
};

export default Blob;
