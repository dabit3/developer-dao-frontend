import useDeveloperSearch from "hooks/useDeveloperSearch";

import Table from "./Table";
import TextInput from "./TextInput";

type Props = {
	onClick?: (token: string) => void;
};

export default function DevelopersList({ onClick }: Props) {
	const { setFilter, resultList, resultCount, visibleCount } =
		useDeveloperSearch();

	const handleClick = (item: any) => {
		const { id, available } = item;
		if (available) {
			if (window.confirm(`Do you want to claim the token ${id}?`)) {
				onClick?.(id);
			}
		} else {
			window.alert(`The token ${id} is already claimed!`);
		}
	};

	const resultsMessage =
		resultCount !== visibleCount
			? `Showing first ${visibleCount} results from a total of ${resultCount} matches`
			: `Showing ${resultCount} matches`;

	return (
		<>
			<TextInput
				id="filter"
				label="Filter"
				hint="Separate keywords with spaces, commas or semicolons"
				onChange={setFilter}
			/>
			<div className="py-4">{resultsMessage}</div>
			<Table
				caption="List of developers by token id and attributes"
				data={resultList}
				onClick={handleClick}
			/>
		</>
	);
}
