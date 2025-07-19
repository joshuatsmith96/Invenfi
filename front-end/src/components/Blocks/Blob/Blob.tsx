import { useEffect, useState } from "react";

export type StyleAttributes = {
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type BlobStyles = {
  desktop: StyleAttributes;
  tablet?: StyleAttributes;
  phone?: StyleAttributes;
};

export type BlobSettings = {
  styles: BlobStyles;
  movement: number;
};

const Blob = ({ styles, movement }: BlobSettings) => {
  const desktopStyle = styles.desktop;
  const tabletStyle = styles.tablet;
  const phoneStyle = styles.phone;

  type SizeCategory = "desktop" | "tablet" | "phone" | null;

  const [activeStyle, setActiveStyle] = useState(phoneStyle);
  const [currentCategory, setCurrentCategory] = useState<SizeCategory>(null);

  const updateStyleIfNeeded = () => {
    const width = window.innerWidth;
    let newCategory: SizeCategory = null;
    let newStyle: StyleAttributes | null = null;

    if (width >= 1000) {
      newCategory = "desktop";
      newStyle = desktopStyle;
    } else if (width >= 800 && tabletStyle) {
      newCategory = "tablet";
      newStyle = tabletStyle;
    } else if (width >= 450 && phoneStyle) {
      newCategory = "phone";
      newStyle = phoneStyle;
    }

    if (newCategory && newStyle && newCategory !== currentCategory) {
      setCurrentCategory(newCategory);
      setActiveStyle(newStyle);
    }
  };

  useEffect(() => {
    // Set initial style on mount
    updateStyleIfNeeded();

    // Add resize event listener
    window.addEventListener("resize", updateStyleIfNeeded);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", updateStyleIfNeeded);
    };
    // Empty dependency array: only runs once
  }, []);

  return (
    <div
      className={`blob absolute bg-[#CCDEFF] rounded-full circle-move-${movement} shadow-md shadow-[#CCDEFF]`}
      style={activeStyle}
    ></div>
  );
};

export default Blob;
