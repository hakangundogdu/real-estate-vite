import { getProperty } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import millify from "millify";
import { BiBath, BiBed, BiHeart, BiPhone } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/authContext";
import { db, colRef } from "../firebase";
import { addDoc, doc, updateDoc } from "@firebase/firestore";

const PropertyDetail = () => {
	const { id } = useParams();
	const { user, userData } = useContext(AuthContext);
	const [saved, setSaved] = useState(false);
	const docRef = doc(db, "users", `${userData?.id}`);
	const userId = user?.uid;
	const savedIds = userData?.savedIds;

	const { data: property, isLoading } = useQuery({
		queryKey: ["getProperties", id],
		queryFn: () => getProperty(id!),
	});

	console.log("savedIDs", savedIds);

	useEffect(() => {
		if (userData) {
			setSaved(userData.savedIds?.includes(id));
		}
	}, [userData, savedIds]);

	console.log("saved", saved);

	console.log("property", property);
	const saveHandler = (id: string) => {
		const newList = [...savedIds, id];

		if (savedIds.length === 0) {
			addDoc(colRef, {
				uid: userId,
				saved: newList,
			});
		} else {
			updateDoc(docRef, {
				uid: userId,
				saved: newList,
			});
		}
	};

	const removeSaveHandler = (id: string) => {
		const newList = savedIds.filter((item: string) => item !== id);
		updateDoc(docRef, {
			uid: userId,
			saved: newList,
		});
	};

	return (
		<div className="flex-auto container px-8 py-6">
			<div className="grid gap-4 md:grid-cols-2 h-96">
				<div className="flex w-full bg-center bg-cover h-96 overflow-hidden rounded-xl">
					<img
						className="w-full h-96 object-cover"
						src={property?.images[4]["645x430"]}
						alt="image of house"
					/>
				</div>
				<div className="flex flex-col justify-center ml-6 p-4">
					<p className="text-3xl font-bold">£{millify(+property?.price)}</p>
					<p className="text-xl font-semibold text-primary mt-6">
						{property?.title}
					</p>
					<p className="text-lg text-muted-foreground mt-6">
						{property?.displayable_address}
					</p>
					<div className="flex mt-6">
						<BiBed className="size-6 text-primary" />
						<p className="text text-muted-foreground ml-2 mr-4">
							{property?.num_bedrooms}
						</p>
						<BiBath className="size-6 text-primary" />
						<p className="text text-muted-foreground ml-2">
							{property?.num_bathrooms}
						</p>
					</div>
					<div className="flex gap-4 mt-6">
						{!saved ? (
							<Button
								className="text-white text-md"
								onClick={
									// userId
									//   ? () => saveHandler({ id: property.id })
									//   : popUpHandler
									() => saveHandler(id!)
								}
							>
								<BiHeart className="size-5 mr-2 text-white" />
								Save
							</Button>
						) : (
							<Button
								variant="secondary"
								className=" text-md"
								onClick={() => removeSaveHandler(id!)}
							>
								<BiHeart className="size-5 mr-2" />
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
		</div>
	);
};

export default PropertyDetail;
