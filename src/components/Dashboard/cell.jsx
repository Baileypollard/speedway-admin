import * as React from 'react';
import '../Styles/data-table.css'

export default function Cell({
  content,
  header,
}) {

  const cellMarkup = header ? (
    <th className="Cell Cell-header">
      {content}
    </th>
  ) : (
    <td className="Cell">
      {content}
    </td>
  );

  return (cellMarkup);
}