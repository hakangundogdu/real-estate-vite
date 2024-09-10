const Footer: React.FC = () => {
	return (
		<div className="border-t border-t-slate-200">
			<footer className="container px-8 py-4 w-full flex items-center  justify-between">
				<div className="w-full md:flex md:items-center md:justify-between">
					<span className="text-sm  sm:text-center">
						© 2024
						<a href="/" className="hover:underline mx-2">
							Dream Home.
						</a>
						By
						<a
							href="https://github.com/hakangundogdu"
							className="hover:underline ml-1 text-primary"
							target="_blank"
							rel="noopener noreferrer"
						>
							Hakan Gundogdu
						</a>
					</span>
					<ul className="hidden md:flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
						<li>
							<a href="/" className="hover:underline me-4 md:me-6">
								About
							</a>
						</li>
						<li>
							<a href="/" className="hover:underline me-4 md:me-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="/" className="hover:underline me-4 md:me-6">
								Licensing
							</a>
						</li>
						<li>
							<a href="/" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
