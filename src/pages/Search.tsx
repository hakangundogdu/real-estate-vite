import "../App.css";
import { useEffect, useState } from "react";
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
import { getProperties } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Search() {
	const { tab: paramTab, location: paramLocation } = useParams();
	const location = useLocation();
	const [tab, setTab] = useState(paramTab);
	const [searchLocation, setSearchLocation] = useState(paramLocation);
	const [isOpen, setIsOpen] = useState(false);
	const [sort, setSort] = useState<"asc" | "desc">("desc"); // Updated type to "asc" | "desc"

	const navigate = useNavigate();

	const acceptedLocation =
		searchLocation !== undefined &&
		["london", "manchester", "oxford"].includes(searchLocation.toLowerCase());

	useEffect(() => {
		if (location.state?.scrollPosition) {
			window.scrollTo(0, location.state.scrollPosition);
		}
	}, [location.state?.scrollPosition]);

	const {
		data: properties,
		isLoading,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ["getProperties"],
		queryFn: () =>
			getProperties({
				city: paramLocation,
				status: paramTab,
				sort: sort,
			}),
		enabled: false,
	});

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			localStorage.setItem("scrollPosition", currentScrollPosition.toString());
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		// Retrieve the scroll position from localStorage
		const savedScrollPosition = localStorage.getItem("scrollPosition");

		if (savedScrollPosition) {
			// Restore the scroll position
			window.scrollTo(0, parseInt(savedScrollPosition, 10));

			// Optionally, clear the saved scroll position from localStorage
			localStorage.removeItem("scrollPosition");
		}
	}, []);

	useEffect(() => {
		refetch();
	}, [location, sort]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!acceptedLocation) setIsOpen(true);
		navigate(`/search/${tab}/${searchLocation}`);
		refetch();
	};

	const locationChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const loc = event.target.value;
		setSearchLocation(
			loc.charAt(0).toUpperCase() + loc.substring(1).toLowerCase()
		);
	};

	const onTabChange = (value: string) => {
		setTab(value);
	};

	const onSortChange = (value: "asc" | "desc") => {
		setSort(value);
	};

	console.log("sort", sort);

	return (
		<div className="flex-auto flex-col w-full">
			<div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-1 md:px-8">
				<div className="h-10 w-full md:w-1/2 lg:w-1/3 rounded-full bg-background py-2 text-sm placeholder:text-muted-foreground flex items-center gap-2 ">
					<Select onValueChange={onTabChange} value={tab}>
						<SelectTrigger className="w-[100px]  focus:ring-0 focus:ring-offset-0	">
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
							placeholder="London, Manchester or Oxford only"
							onChange={locationChangeHandler}
							value={searchLocation}
							className="focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
						/>
						<Button className="ml-2" type="submit">
							Search
						</Button>
					</form>
				</div>
				<div className="flex items-center justify-start">
					<p className="text-sm ml-2">Sort:</p>
					<Select onValueChange={onSortChange} value={sort}>
						<SelectTrigger className="w-32 border-0 focus:ring-0 focus:ring-offset-0	">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="desc">Highest Price</SelectItem>
								<SelectItem value="asc">Lowest Price</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
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

export default Search;
