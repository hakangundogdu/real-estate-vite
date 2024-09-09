import {
	getProperty,
	getSavedProperties,
	saveProperty,
	deleteSavedProperty,
} from "@/api/api";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import millify from "millify";
import {
	BiBath,
	BiBed,
	BiHeart,
	BiPhone,
	BiChevronRight,
	BiChevronLeft,
	BiArrowBack,
} from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import AuthContext from "@/context/authContext";
import PropertySkeleton from "@/components/ui/PropertySkeleton";
import { LoginAlertDialog } from "@/components/ui/login-modal";
import MapWide from "@/components/MapWide";
import { Loader2 } from "lucide-react";

const PropertyDetail = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const userId = user?.uid;
	const [currentImage, setCurrentImage] = useState(0);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: property } = useQuery({
		queryKey: ["getProperty", id],
		queryFn: () => getProperty(id!),
	});

	const { data: savedProperties, isFetching } = useQuery({
		queryKey: ["getSaved", user?.uid],
		queryFn: () => getSavedProperties(user?.uid!),
	});

	const saveMutation = useMutation({
		mutationFn: saveProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSaved"] });
		},
	});
	const deleteMutation = useMutation({
		mutationFn: deleteSavedProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSaved"] });
		},
	});

	const isSaved = savedProperties?.some((item) => item.id === id);

	window.scrollTo(0, 0);

	const prev = () =>
		setCurrentImage((currentImage) =>
			currentImage === 0 ? property.images.length - 1 : currentImage - 1
		);

	const next = () =>
		setCurrentImage((currentImage) =>
			currentImage === property.images.length - 1 ? 0 : currentImage + 1
		);

	const saveHandler = () => {
		if (!userId) {
			setIsOpen(true);
		} else {
			saveMutation.mutate({
				uid: userId,
				id: id,
			});
		}
	};

	const removeSaveHandler = () => {
		deleteMutation.mutate({ uid: userId, id });
	};

	const closeHandler = () => setIsOpen(false);

	return (
		<>
			<div className="container flex -mb-4 px-1 md:px-8">
				<Button
					variant="link"
					className="align-left text-md px-0 hover:no-underline text-muted-foreground"
					onClick={() => navigate(-1)}
				>
					<BiArrowBack className="size-5 mr-2" />
					Back to Search Results
				</Button>
			</div>
			{property ? (
				<>
					<div className="flex-auto container py-6 px-1 md:px-8">
						<div className="flex flex-col md:flex-row md:h-96">
							<div className="flex w-full md:w-1/2 bg-center bg-cover h-96 overflow-hidden rounded-xl relative">
								<img
									className="w-full h-96 object-cover"
									src={property.images[currentImage]}
									alt="image of house"
								/>
								<div className="absolute inset-0 flex items-center justify-between p-4">
									<button
										onClick={prev}
										className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
									>
										<BiChevronLeft className="size-6" />
									</button>
									<button
										onClick={next}
										className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
									>
										<BiChevronRight className="size-6" />
									</button>
								</div>
								<div className="absolute bottom-4 right-0 left-0">
									<div className="flex items-center justify-center gap-2">
										{Array.from(Array(property.images.length).keys()).map(
											(i) => (
												<div
													key={i}
													className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
														currentImage === i ? "p-0.5" : "bg-opacity-50"
													}`}
												/>
											)
										)}
									</div>
								</div>
							</div>
							<div className="flex flex-col justify-center text-left md:ml-6 p-4">
								<p className="text-3xl font-bold">
									£{millify(+property?.price)}
								</p>
								<p className="text-xl font-semibold text-primary mt-6">
									{property?.title}
								</p>
								<p className="text-lg text-muted-foreground mt-6">
									{property?.address}
								</p>
								<p className="text-lg text-muted-foreground mt-2">
									{property.city[0].toUpperCase() + property.city.slice(1)}
								</p>

								<div className="flex mt-6">
									<BiBed className="size-6 text-primary" />
									<p className="text text-muted-foreground ml-2 mr-4">
										{property?.bedrooms}
									</p>
									<BiBath className="size-6 text-primary" />
									<p className="text text-muted-foreground ml-2">
										{property?.bathrooms}
									</p>
								</div>
								<div className="flex gap-4 mt-6">
									{!isSaved ? (
										<Button
											className="text-white text-md"
											onClick={() => saveHandler()}
										>
											{saveMutation.isPending || isFetching ? (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											) : (
												<BiHeart className="size-5 mr-2 text-white" />
											)}
											Save
										</Button>
									) : (
										<Button
											variant="secondary"
											className=" text-md"
											onClick={() => removeSaveHandler()}
										>
											{saveMutation.isPending || isFetching ? (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											) : (
												<BiHeart className="size-5 mr-2" />
											)}
											Remove
										</Button>
									)}

									<Button variant="outline" className="text-md">
										<BiPhone className="size-5 mr-2" />
										Call Agent
									</Button>
								</div>
							</div>
						</div>
						<div className="h-[400px] w-full rounded-2xl mt-6 overflow-hidden">
							<MapWide
								latitude={property.latitude}
								longitude={property.longitude}
							/>
						</div>
					</div>
				</>
			) : (
				<PropertySkeleton />
			)}
			{isOpen && <LoginAlertDialog onClose={closeHandler} />}
		</>
	);
};

export default PropertyDetail;
