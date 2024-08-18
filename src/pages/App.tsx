import "../App.css";
import { useEffect, useState } from "react";
import PropertyList from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getProperties } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading";

function App() {
	const [tab, setTab] = useState("sale");
	const [location, setLocation] = useState("");

	const {
		data: properties,
		isLoading,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ["getProperties"],
		queryFn: () =>
			getProperties({
				county: location.length > 0 ? location : null,
				listing_status: tab,
				limit: location.length === 0 ? 12 : null,
			}),
		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		refetch();
	};

	const locationChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const loc = event.target.value;
		setLocation(loc.charAt(0).toUpperCase() + loc.substring(1).toLowerCase());
	};

	const onTabChange = (value: string) => {
		setTab(value);
	};
	return (
		<div className="flex-auto flex-col w-full">
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
							<div className="h-10 w-full rounded-full bg-background py-2 text-sm placeholder:text-muted-foreground flex items-center mt-4">
								<Select onValueChange={onTabChange} value={tab}>
									<SelectTrigger className="w-[100px] bg-transparent border-y-0 border-l-0 border-r-input rounded-l-full focus:ring-0 focus:ring-offset-0	">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="sale">For Sale</SelectItem>
											<SelectItem value="rent">To Rent</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<form className="flex flex-auto" onSubmit={handleSubmit}>
									<Input
										type="search"
										placeholder="Search"
										onChange={locationChangeHandler}
										value={location}
										className="rounded-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 "
									/>
									<Button
										className="rounded-r-full rounded-l-none"
										type="submit"
									>
										Search
									</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isLoading && <LoadingSpinner />}
			{!isFetching && properties && <PropertyList properties={properties} />}
		</div>
	);
}

export default App;
