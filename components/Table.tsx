import classNames from "classnames";

type Row = Record<string, any>;

type Props = {
	caption: string;
	columns: string[];
	data: Row[];
	onClick?: (item: any) => void;
};

export default function Table({ caption, columns, data, onClick }: Props) {
	return (
		<div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
			<table className="min-w-full">
				<caption className="sr-only">{caption}</caption>
				<TableHeader columns={columns} />
				<TableBody columns={columns} data={data} onClick={onClick} />
			</table>
		</div>
	);
}

type TableHeaderProps = {
	columns: string[];
};

function TableHeader({ columns }: TableHeaderProps) {
	return (
		<thead className="bg-gray-50 border-b border-gray-200">
			<tr>
				{columns.map((column) => (
					<th
						scope="col"
						className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
						key={column}
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
}

type TableBodyProps = {
	data: Row[];
	columns: string[];
	onClick?: (item: any) => void;
};

function TableBody({ data, columns, onClick }: TableBodyProps) {
	return (
		<tbody className="bg-white divide-y divide-gray-200">
			{data.map((row) => (
				<tr
					key={row.id}
					className={classNames(
						"hover:bg-gray-200 cursor-pointer",
						row.available === true && "hover:bg-green-200",
						row.available === false && "hover:bg-red-100",
					)}
					onClick={() => onClick(row)}
				>
					{columns.map((column) => (
						<td
							key={`${row.id}_${column}`}
							className="px-3 py-1 whitespace-nowrap"
						>
							<CellValue value={row[column]} />
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

type CellValueProps = {
	value: any;
};

function CellValue({ value }: CellValueProps) {
	if (typeof value === "undefined") {
		return <>...</>;
	}

	if (typeof value === "boolean") {
		return (
			<div className="flex items-center">
				<span
					className={classNames(
						"mr-2 inline-block p-1 bg-gray-500 rounded-md",
						value === true && "bg-green-500",
						value === false && "bg-red-500",
					)}
				/>
				{value ? "Available" : "Claimed"}
			</div>
		);
	}

	return <>{String(value)}</>;
}
