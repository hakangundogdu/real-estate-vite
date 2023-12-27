import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../App.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PropertyList from "@/components/PropertyList";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <p className="font-bold text-white text-5xl">
              Find Your Dream Home
            </p>
            <p className=" text-white">
              Search properties for sale and to rent in the UK
            </p>

            <div className="flex items-center flex-col mt-4">
              {/* <Tabs
                onValueChange={onTabChange}
                value={tab}
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-full">
                  <TabsTrigger value="sale" className="rounded-full">
                    For Sale
                  </TabsTrigger>
                  <TabsTrigger value="rent" className="rounded-full">
                    To Rent
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex w-full items-center mt-4">
                <Input
                  type="search"
                  placeholder="Search"
                  className="rounded-full"
                />
                <Button className="ml-2 rounded-full">Search</Button>
              </div> */}
              <div className="h-10 w-full rounded-full border border-input bg-background  py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center mt-4">
                <Select onValueChange={onTabChange} value={tab}>
                  <SelectTrigger className="w-[180px] border-r-gray-200 bg-transparent rounded-l-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">To Rent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="search"
                  placeholder="Search"
                  className="rounded-full border-none bg-transparent"
                />
                <Button className="rounded-r-full rounded-l-none ">
                  Search
                </Button>
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
