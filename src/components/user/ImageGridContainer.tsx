import Image from "next/image";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";

export default function ImageGridContainer({
  images,
}: {
  images: StaticImageData[];
}) {
  return (
    <div className="grid grid-rows-2 gap-3 mt-3 sm:grid-cols-2">
      {images.map((imageSrc, idx) => (
        <div
          key={`model ${idx}`}
          className="flex justify-center items-center rounded-md"
        >
          <Image
            src={imageSrc}
            alt={`model ${idx}`}
            className="block w-full h-full rounded-md"
            width={400}
            height={225}
            sizes="(max-width: 360px) 320px, (max-width: 480px) 448px, (max-width: 640px) 600px, 800px"
            placeholder="blur"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
