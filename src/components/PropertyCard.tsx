import * as React from "react";
import { BiBath, BiBed, BiHeart } from "react-icons/bi";
import heartIcon from "@/assets/heart.svg";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PropertyCard() {
  const [saved, setSaved] = React.useState(false);
  console.log("saved", saved);

  return (
    <Card className="relative text-left overflow-hidden">
      <img
        className=""
        src="https://lid.zoocdn.com/645/430/7fc56b1e233b230bcf27b3249548153fed546cf7.jpg"
        alt=""
      />

      <CardHeader className="relative">
        <CardTitle>£4M</CardTitle>
        <p className="mt-2 font-semibold text-primary">2 bed flat for sale</p>
        <button
          className="absolute top-6 right-6 !mt-0"
          onClick={() => setSaved(!saved)}
        >
          {saved ? (
            <HeartIcon className="w-6 h-6 text-destructive" />
          ) : (
            <HeartOutline className="w-6 h-6 text-destructive" />
          )}
        </button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Albert Court, Prince Consort Road, London SW7
        </p>
      </CardContent>
      <CardFooter className="flex ">
        <BiBed className="size-5 text-primary" />
        <p className="text-sm text-muted-foreground ml-2 mr-4">2</p>
        <BiBath className="size-5 text-primary" />
        <p className="text-sm text-muted-foreground ml-2">2</p>
      </CardFooter>
    </Card>
  );
}

export default PropertyCard;
