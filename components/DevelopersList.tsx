import { useState } from "react";

import useDeveloperAvailabilityList from "hooks/useDeveloperAvailabilityList";

import Table from "./Table";
import TextInput from "./TextInput";

export default function DevelopersList() {
	const [filter, setFilter] = useState("");

	const developerList = useDeveloperAvailabilityList();
	const filteredList = useFilteredList(developerList, filter);
	const cappedList = useCappedList(filteredList, 100);
	const totalResults =
		filteredList.length !== cappedList.length
			? `Showing first ${cappedList.length} results from a total of ${filteredList.length} matches`
			: `Showing ${filteredList.length} matches`;

	return (
		<>
			<TextInput
				id="filter"
				label="Filter"
				hint="Separate keywords with spaces, commas or semicolons"
				onChange={setFilter}
			/>
			<div className="py-4">{totalResults}</div>
			<Table
				caption="List of developers by token id and attributes"
				data={cappedList}
			/>
		</>
	);
}

function useFilteredList(data: any[] = [], filter: string) {
	const keywordList = filter.toLowerCase().split(/[ ,;]/).filter(Boolean);

	return data.filter((row) => {
		const cellList: string[] = Object.values(row);

		// a row must contain all keywords to be matched
		return keywordList.every((keyword) => {
			return cellList.some((cell) =>
				String(cell).toLowerCase().includes(keyword),
			);
		});
	});
}

function useCappedList(data: any[] = [], capacity: number) {
	return data.slice(0, capacity);
}
