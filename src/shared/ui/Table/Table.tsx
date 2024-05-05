import React, { useRef } from 'react';
import { Answer } from 'features/questionList/questionListStore';
import Button from '../Button';

interface TableProps {
  content: Array<Answer[]>;
}

const Table = ({ content }: TableProps) => {
  const tableH = useRef<HTMLTableElement | null>(null);

  const onCopyTableHandler = () => {
    if (tableH.current) {
      const tableHtml = tableH.current.innerHTML;
      navigator.clipboard.writeText(tableHtml);
    }
    const myTable = document.getElementById('myTable');

    if (myTable) {
      if (document.createRange && window.getSelection) {
        const range = document.createRange();
        const sel = window.getSelection();
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
      <Button title="Выделить таблицу" onClick={onCopyTableHandler} />
      <table ref={tableH} id="myTable">
        <tbody>
          {content.map((row, index) => {
            return (
              <tr key={`tr${Date.now}`}>
                {row.map((cell, i) => (
                  <td key={`td${cell.text}`}>{cell.text}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
