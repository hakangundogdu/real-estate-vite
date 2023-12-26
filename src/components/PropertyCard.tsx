import * as React from "react";
import { BiBath, BiBed, BiHeart } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PropertyCard() {
  return (
    <Card className="relative text-left  overflow-hidden">
      <img
        className=""
        src="https://lid.zoocdn.com/645/430/7fc56b1e233b230bcf27b3249548153fed546cf7.jpg"
        alt=""
      />
      <button
        className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
          </svg>
        </span>
      </button>
      <CardHeader className="relative">
        <CardTitle>£4M</CardTitle>
        <p className="mt-2 font-semibold text-primary">2 bed flat for sale</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Albert Court, Prince Consort Road, London SW7
        </p>
      </CardContent>
      <CardFooter className="flex ">
        <BiBed />
        <p className="text-sm text-muted-foreground ml-2 mr-3">2</p>
        <BiBath />
        <p className="text-sm text-muted-foreground ml-2">2</p>
      </CardFooter>
    </Card>
  );
}

export default PropertyCard;
