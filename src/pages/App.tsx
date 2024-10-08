import "../App.css";
import { useState } from "react";
import PropertyList from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getFeatured } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading";
import { useNavigate } from "react-router-dom";

function App() {
	const [status, setStatus] = useState("sale");
	const [city, setCity] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const acceptedLocation = ["london", "manchester", "oxford"].includes(
		city.toLowerCase()
	);

	const {
		data: properties,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["featured"],
		queryFn: () => getFeatured(),
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (acceptedLocation) {
			navigate(`/search/${status}/${city}`);
		} else setIsOpen(true);
	};

	const locationChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const loc = event.target.value;
		setCity(loc.charAt(0).toUpperCase() + loc.substring(1).toLowerCase());
	};

	const onTabChange = (value: string) => {
		setStatus(value);
	};
	return (
		<div className="flex-auto flex-col w-full">
			<div
				className="w-full bg-center bg-cover h:64 md:h-96"
				style={{
					backgroundImage: "url('/hero_image.jpeg')",
				}}
			>
				<div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-40 py-12 px-4">
					<div className="w-full flex flex-col items-center justify-center">
						<p className="font-bold text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl">
							Find Your Dream Home
						</p>
						<p className="text-white text-md md:text-lg lg:text-xl xl:text-2xl">
							Search properties for sale and to rent in the UK
						</p>

						<div className="flex flex-col w-full mt-2 ">
							<div className=" w-full rounded-full py-2 text-sm placeholder:text-muted-foreground flex flex-col sm:flex-row justify-center items-center gap-2 ">
								<Select onValueChange={onTabChange} value={status}>
									<SelectTrigger className="w-full sm:w-[100px] focus:ring-0 focus:ring-offset-0	">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="sale">For Sale</SelectItem>
											<SelectItem value="rent">To Rent</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<form
									className="flex flex-col sm:flex-row w-full sm:w-3/4 md:w-1/2 xl:w-1/4 gap-2"
									onSubmit={handleSubmit}
								>
									<Input
										type="search"
										placeholder="London, Manchester or Oxford only"
										onChange={locationChangeHandler}
										value={city}
										className="focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
									/>
									<Button className="" type="submit">
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

			{isOpen && (
				<AlertDialog open={true}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Mode!</AlertDialogTitle>
							<AlertDialogDescription>
								Please search "London", "Oxford" or "Manchester".
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogAction onClick={() => setIsOpen(false)}>
								Ok
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}

export default App;
