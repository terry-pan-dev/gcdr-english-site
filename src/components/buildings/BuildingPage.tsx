import { BuildingDetail } from "./BuildingDetail";
import { DiningRoomDetail } from "./DiningRoomDetail";
import { WisdomPalaceDetail } from "./WisdomPalaceDetail"; // 导入新组件
import React from "react";

interface BuildingImage {
  src: string;
  alt: string;
}

interface RelatedBuilding {
  slug: string;
  name: string;
  nameChinese?: string;
  description?: string;
  image: string;
}

interface BuildingPageProps {
  name: string;
  nameChinese?: string;
  description: string;
  images?: BuildingImage[];
  featuredImage?: BuildingImage;
  galleryImages?: BuildingImage[];
  // leftText?: string;            // commented by maomao 2016-0113
  leftContent?: React.ReactNode; // added by maomao 2016-0113
  rightContent?: React.ReactNode;
  relatedBuildings?: RelatedBuilding[];
  type?: "standard" | "dining-room" | "wisdom-palace";
}

export function BuildingPage({
  name,
  nameChinese,
  description,
  images,
  featuredImage,
  galleryImages,
  leftContent, //added by maomao 20160113
  rightContent,
  relatedBuildings,
  type = "standard",
}: BuildingPageProps) {
  // if (
  //   type === "dining-room" &&
  //   featuredImage &&
  //   galleryImages &&
  //   leftContent
  // ) {
  //   return (
  //     <DiningRoomDetail
  //       name={name}
  //       nameChinese={nameChinese}
  //       description={description}
  //       featuredImage={featuredImage}
  //       galleryImages={galleryImages}
  //       leftContent={leftContent}
  //       rightContent={rightContent}
  //       //relatedBuildings={relatedBuildings}
  //       relatedBuildings={relatedBuildings ?? []}
  //     />
  //   );
  // }

  // Dining Room 逻辑
  if (type === "dining-room" && featuredImage && galleryImages && leftContent) {
    return (
      <DiningRoomDetail
        name={name}
        nameChinese={nameChinese}
        description={description}
        featuredImage={featuredImage}
        galleryImages={galleryImages}
        leftContent={leftContent}
        rightContent={rightContent}
        relatedBuildings={relatedBuildings ?? []}
      />
    );
  }

  // 新增：Wisdom Palace 逻辑
  if (type === "wisdom-palace" && featuredImage && leftContent) {
    return (
      <WisdomPalaceDetail
        name={name}
        nameChinese={nameChinese}
        description={description}
        featuredImage={featuredImage}
        leftContent={leftContent}
        rightContent={rightContent}
        relatedBuildings={relatedBuildings ?? []}
      />
    );
  }

  if (images) {
    return (
      <BuildingDetail
        name={name}
        nameChinese={nameChinese}
        description={description}
        images={images}
      />
    );
  }

  return null;
}
