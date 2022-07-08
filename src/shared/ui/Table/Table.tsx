import { useRef } from 'react';
import Button from '../Button';

interface TableProps {
    content: Array<string[]>;
}

const Table = ({
    content,
}: TableProps) => {
    const tableH = useRef<HTMLTableElement | null>(null);

    const onCopyTableHandler = () => {
        if (tableH.current) {
            const tableHtml = tableH.current.innerHTML;
            navigator.clipboard.writeText(tableHtml);
        }
        const myTable = document.getElementById('myTable');

        if (myTable) {
            if (document.createRange && window.getSelection) {
                let range = document.createRange();
                let sel = window.getSelection();
                if (sel) {
                    sel.removeAllRanges();

                    try {
                        range.selectNodeContents(myTable);
                        sel.addRange(range);
                    } catch (e) {
                        range.selectNode(myTable);
                        sel.addRange(range);
                    }
                }
            }
        }
    };

    return (
        <>
            <Button title='Скопировать таблицу' onClick={onCopyTableHandler} />
            <table ref={tableH} id='myTable'>
                <tbody>
                    {
                        content.map((row, index) => {
                            return <tr key={'tr' + index}>{row.map((cell, i) => <td key={'td' + i}>{cell}</td>)}</tr>;
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default Table;