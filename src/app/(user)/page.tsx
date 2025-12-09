import Link from "next/link";
import model1 from "/public/home/model-1.webp";
import model2 from "/public/home/model-2.webp";
import model3 from "/public/home/model-3.webp";
import model4 from "/public/home/model-4.webp";
import autocad1 from "/public/home/autocad1.webp";
import autocad2 from "/public/home/autocad2.webp";
import autocad3 from "/public/home/autocad3.webp";
import autocad4 from "/public/home/autocad4.webp";

import {
  ImageGridContainer,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { ArrowUpRight, Sparkle } from "lucide-react";

export default function Home() {
  return (
    <div className="p-3 w-full">
      <div className="min-h-[400px] grid grid-rows-2 sm:grid-cols-2 gap-3 text-white font-bold">
        <div className="col-span-1 ui-flex-center bg-gradient-blue-100 rounded-lg text-center transition-colors cursor-pointer sm:row-span-full">
          <Dialog>
            <DialogTrigger className="w-full h-full">
              AutoCAD Class
            </DialogTrigger>
            <DialogContent className="min-w-[60dvw] max-h-[80dvh] p-4 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-start text-lg">
                  AutoCAD Class
                </DialogTitle>
                <div className="overflow-y-scroll">
                  <ImageGridContainer
                    images={[autocad1, autocad2, autocad3, autocad4]}
                  />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="col-span-1 ui-flex-center bg-gradient-blue-200 rounded-lg text-center transition-colors cursor-pointer sm:row-span-full">
          <Dialog>
            <DialogTrigger className="w-full h-full">
              SketchUp + Enscape Class
            </DialogTrigger>
            <DialogContent className="min-w-[60dvw] max-h-[80dvh] p-4 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-start text-lg">
                  SketchUp + Enscape Class
                </DialogTitle>
                <div className="py-3 overflow-y-scroll">
                  <div className="px-3 py-2 w-fit text-xs text-start text-gray-600 font-semibold bg-gray-100 rounded-md">
                    스케치업 1은 Sketchup, 스케치업 2은 Sketchup, Enscape,
                    Photoshop을 활용합니다.
                  </div>
                  <ImageGridContainer
                    images={[model1, model2, model3, model4]}
                  />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="flex items-center gap-1 text-xl font-bold">
          <Sparkle size={18} className="text-blue-600" />
          <span>유용한 사이트</span>
        </h4>
        <div className="mt-4">
          <span className="font-semibold">공간 프로젝트 소개 웹서비스</span>
          <ul className="flex flex-col flex-wrap gap-4 mt-4 sm:flex-row">
            <li>
              <Link
                href="https://designthou.com/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>designthou</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.archdaily.com/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>archdaily</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.dezeen.com/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>dezeen</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://magazine.brique.co/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span> brique magazine(브리크 매거진)</span>
                <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://vmspace.com/main/main.html"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>SPACE(월간 공간)</span> <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-12">
          <span className="font-semibold">Free 3D Modeling 사이트</span>
          <ul className="flex flex-col gap-4 mt-4 sm:flex-row">
            <li>
              <Link
                href="https://3dwarehouse.sketchup.com/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>SketchUp 3D Warehouse</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.uncover3dmodelling.com/source/list"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>uncover3d modeling</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://free3d.com/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-gray-800 bg-gray-100 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>free3d.com</span> <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-12">
          <span className="font-semibold">Material Download Site</span>
          <ul className="flex gap-4 mt-4">
            <li>
              <Link
                href="https://architextures.org/"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-blue-500 bg-blue-50 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>architextures</span> <ArrowUpRight size={16} />
              </Link>
            </li>
            <li>
              <Link
                href="https://ambientcg.com/list?type=material"
                target="_blank"
                className="ui-flex-center gap-1 px-2 py-2 text-blue-500 bg-blue-50 font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <span>ambientcg</span> <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
