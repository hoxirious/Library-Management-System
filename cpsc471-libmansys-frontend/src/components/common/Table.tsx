import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import "styles/components/Table.sass";


export type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
    borderCollapse: 'collapse'
} as const

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
    return (
        <div className="custom-table">
            <table style={style}>
                <TableHeader columns={columns} />
                <TableRows
                    data={data}
                    columns={columns}
                />
            </table>
        </div>
    );
};

export default Table;