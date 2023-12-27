import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../App.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PropertyList from "@/components/PropertyList";

function App() {
  const [tab, setTab] = useState("sale");

  const onTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <div className="flex-auto w-full">
      <div
        className="w-full bg-center bg-cover h-96"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070)",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-40 py-12 px-4">
          <div className="p-2 md:w-2/4 lg:w-1/3 w-full">
            <p className="font-bold text-white text-4xl">
              Find Your Home
            </p>
            <p className=" text-white">
              Search properties for sale and to rent in the UK
            </p>

            <div className="flex items-center flex-col mt-4">
              <Tabs
                onValueChange={onTabChange}
                value={tab}
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sale">For Sale</TabsTrigger>
                  <TabsTrigger value="rent">To Rent</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex w-full items-center mt-4">
                <Input type="search" placeholder="Search" />
                <Button className="ml-2">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PropertyList />
    </div>
  );
}

export default App;
